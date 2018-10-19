//
// This test harness enqueues assertions, shuffles them, then executes them.
//
// USAGE AND EXAMPLES:
//
// ```
//
//   class Person {
//     sayHi(person) {
//       person.hello();
//       // person.goodbye(); // Try uncommenting this line.
//     }
//
//     hello() {}
//
//     goodbye() {}
//   }
//
//   const seed = new Date().toLocaleTimeString();
//   const _ = new TestHarness(seed);
//
//   _.Class('Person', () => {
//     _.method('#sayHi', () => {
//       const me = new Person();
//       const friendProxy = _.proxy(new Person());
//
//       _.allow(friendProxy).toReceive('hello'); // And call through.
//       _.allow(friendProxy).toReceive('goodbye').andReturn('See ya!');
//
//       me.sayHi(friendProxy);
//
//       _.expect(friendProxy).toHaveReceived('hello'); // Once
//       _.expect(friendProxy).toHaveReceived('goodbye').nTimes(0);
//
//       _.assert('It says only hello', () => friendProxy.isAsExpected());
//     });
//   });
//
//   _.Class('TestHarness', () => {
//     _.assert('It can and does test itself.', () => true);
//     _.assert('It supports multiple assertions in a row', () => true);
//
//     _.context('When an assertion has multiple sub-conditions', () => {
//       _.assert('It can take them as an array', () => [true, true, ...]);
//     });
//
//     _.context('When an assertion is being worked on', () => {
//       _.assertOne('It can be singled out with assert[One]', () => true);
//     });
//
//     _.context('When an assertion is temporarily pending', () => {
//       _.xassert('It can be skipped with [x]assert', () => true);
//     });
//   });
//
//   _.executeAssertions();
//
// ```

/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['proxy', 'allow', 'expect', 'echo', 'noop'] }] */

// Testing framework
import TestCasePrinter from './__TestCasePrinter__.js';
import TestProxy from './__TestProxy__.js';

// Libs
import './lib/js/seedrandom.js';

export default class TestHarness {
  constructor(seed, PrinterOverride) {
    // Props
    this.seed = seed; // E.g '3:00:19 PM'.
    this.Printer = PrinterOverride || TestCasePrinter;

    // Current context
    this.currentClass = null; // E.g 'Matrix', 'Core'.
    this.currentMethod = null; // Either '#instanceMethod' or '.classMethod'.
    this.currentContext = null; // 'When ...'. Note: Nesting is not supported.
    this.currentAssertion = null; // 'It ...'.

    // States
    this.queue = []; // [{ currentClass, etc }, ...] for easy access.
    this.failures = []; // [[currentClass, etc], ...] for easy sorting.
    this.pendingCount = 0;
    this.assertingOne = false;
  }

  Class(Class, block) {
    this.currentClass = Class;
    block();
    this.currentClass = null;
  }

  method(name, block) {
    this.currentMethod = name;
    block();
    this.currentMethod = null;
  }

  context(string, block) {
    this.currentContext = string;
    block();
    this.currentContext = null;
  }

  assert(string, assertion) {
    if (this.assertingOne === true) return;

    this.currentAssertion = string;
    this.enqueue(assertion);
    this.currentAssertion = null;
  }

  assertOne(string, assertion) {
    if (this.assertingOne === true) return;

    this.queue.length = 0;
    this.assert(string, assertion);
    this.assertingOne = true;
  }

  xassert() {
    this.pendingCount += 1;
  }

  executeAssertions() {
    this.shuffle();
    this.perform();
    this.print();
  }

  //
  // Delegated
  //

  proxy(instance) {
    return new TestProxy(instance);
  }

  allow(instanceProxy) {
    TestProxy.verify(instanceProxy);
    return instanceProxy.allowIt();
  }

  expect(instanceProxy) {
    TestProxy.verify(instanceProxy);
    return instanceProxy.expectIt();
  }

  echo() {
    return TestProxy.echo();
  }

  noop() {
    return TestProxy.noop();
  }

  //
  // Private
  //

  enqueue(assertion) {
    this.queue.push({
      currentClass: this.currentClass,
      currentMethod: this.currentMethod,
      currentContext: this.currentContext,
      currentAssertion: this.currentAssertion,
      assertion,
    });
  }

  shuffle() {
    Math.seedrandom(this.seed);

    // Fisher-Yates shuffle
    for (let i = this.queue.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.queue[i];
      this.queue[i] = this.queue[j];
      this.queue[j] = temp;
    }
  }

  perform() {
    this.queue.forEach((testCase) => {
      const assertions = [testCase.assertion()].flat();
      const allTrue = assertions.every(assertion => assertion === true);
      if (!allTrue) {
        this.failures.push([
          testCase.currentClass,
          testCase.currentMethod,
          testCase.currentContext,
          testCase.currentAssertion,
        ]);
      }
    });
  }

  print() {
    new this.Printer(this.failures.sort()).print();
  }
}
