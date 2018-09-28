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
//   const th = new TestHarness(seed);
//
//   th.Class(Person, () => {
//     th.method('#sayHi', () => {
//       const me = new th.DescribedClass();
//       const friendProxy = th.proxy(new th.DescribedClass());
//
//       th.allow(friendProxy).toReceive('hello'); // And call through.
//       th.allow(friendProxy).toReceive('goodbye').andReturn('See ya!');
//
//       me.sayHi(friendProxy);
//
//       th.expect(friendProxy).toHaveReceived('hello'); // Once
//       th.expect(friendProxy).toHaveReceived('goodbye').nTimes(0);
//
//       th.assert('It says only hello', () => friendProxy.isAsExpected());
//     });
//   });
//
//   th.Class(TestHarness, () => {
//     th.assert('It can and does test itself.', () => true);
//     th.assert('It supports multiple assertions in a row', () => true);
//
//     th.context('When an assertion has multiple sub-conditions', () => {
//       th.assert('It can take them as an array', () => [true, true, ...]);
//     });
//
//     th.context('When an assertion is temporarily pending', () => {
//       th.xassert('It can be skipped with [x]assert', () => true);
//     });
//   });
//
//   th.executeAssertions();
//
// ```

import __TestCasePrinter__ from './__TestCasePrinter__.js';
import __TestProxy__ from './__TestProxy__.js';

import './lib/js/seedrandom.js';

export default class TestHarness {
  constructor(seed) {
    this.seed = seed; // E.g '3:00:19 PM'.

    this.DescribedClass = null; // E.g Matrix, Core.
    this.currentClass = null; // E.g 'Matrix', 'Core'.
    this.currentMethod = null; // Either '#instanceMethod' or '.classMethod'.
    this.currentContext = null; // 'When ...'. Note: Nesting is not supported.
    this.currentAssertion = null; // 'It ...'.

    this.queue = []; // [{ currentClass, etc }, ...] for easy access.
    this.failures = []; // [[currentClass, etc], ...] for easy sorting.
    this.proxies = {}; // { [TEST_PROXY_ID]: proxy, ... }
    this.pendingCount = 0;
  }

  Class(Class, block) {
    this.DescribedClass = Class;
    this.currentClass = Class.name;
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
    this.currentAssertion = string;
    this.enqueue(assertion);
    this.currentAssertion = null;
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
    // eslint-disable-next-line no-param-reassign
    instance.TEST_PROXY_ID = new Date().getTime(); // Auto propagated to proxy.
    this.proxies[instance.TEST_PROXY_ID] = new __TestProxy__(instance);
    return this.proxies[instance.TEST_PROXY_ID];
  }

  allow(instanceProxy) {
    return this.proxies[instanceProxy.TEST_PROXY_ID];
  }

  expect(instanceProxy) {
    return this.proxies[instanceProxy.TEST_PROXY_ID];
  }

  // eslint-disable-next-line class-methods-use-this
  noop() {
    return __TestProxy__.noop();
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
    new __TestCasePrinter__(this.failures.sort()).print();
  }
}
