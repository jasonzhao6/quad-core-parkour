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
//       // person.goodbye();
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
//       const friend = new th.DescribedClass();
//
//       th.allow(friend).toReceive('hello'); // And call through.
//       th.allow(friend).toReceive('goodbye').andReturn('See ya!');
//
//       me.sayHi(th.proxy(friend));
//
//       th.expect(friend).toHaveReceived('hello'); // Once
//       th.expect(friend).toHaveReceived('goodbye').nTimes(0);
//
//       th.assert('It says only hello', () => th.proxy(friend).isAsExpected());
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
    this.className = null; // E.g 'Matrix', 'Core'.
    this.methodName = null; // Either '#instanceMethod' or '.classMethod'.
    this.contextString = null; // 'When ...'. Note: Nesting is not supported.
    this.assertionString = null; // 'It ...'.

    this.queue = []; // [{ className, methodName, etc }, ...] for easy access.
    this.failures = []; // [[className, methodName, etc], ...] for sorting.
    this.proxies = {}; // { [__TestProxyId__]: proxy, ... }
    this.pendingCount = 0;
  }

  Class(Class, block) {
    this.DescribedClass = Class;
    this.className = Class.name;
    block();
    this.className = null;
  }

  method(name, block) {
    this.methodName = name;
    block();
    this.methodName = null;
  }

  context(string, block) {
    this.contextString = string;
    block();
    this.contextString = null;
  }

  assert(string, assertion) {
    this.assertionString = string;
    this.enqueue(assertion);
    this.assertionString = null;
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

  allow(instance) {
    // eslint-disable-next-line no-underscore-dangle
    if (instance.__TestProxyId__ !== undefined) {
      return this.proxy(instance);
    }

    const proxy = new __TestProxy__(instance);
    // eslint-disable-next-line no-underscore-dangle
    this.proxies[instance.__TestProxyId__] = proxy;
    return proxy;
  }

  proxy(instance) {
    // eslint-disable-next-line no-underscore-dangle
    return this.proxies[instance.__TestProxyId__];
  }

  expect(instance) {
    return this.allow(instance);
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
      className: this.className,
      methodName: this.methodName,
      contextString: this.contextString,
      assertionString: this.assertionString,
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
          testCase.className,
          testCase.methodName,
          testCase.contextString,
          testCase.assertionString,
        ]);
      }
    });
  }

  print() {
    new __TestCasePrinter__(this.failures).print();
  }
}
