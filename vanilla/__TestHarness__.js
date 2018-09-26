//
// This test harness enqueues assertions, shuffles them, then executes them.
// All assertions must have a `Class`, a `method`, and an optional `context`.
//
// USAGE AND EXAMPLES:
// ```
//   th = new TestHarness(seed);
//   th.Class(Matrix, () => {
//     th.method('#hello', () => {
//       th.assert('It supports context-free assertions', () => true);
//       th.assert('It supports multiple assertions', () => true);
//
//       th.context('When an assertion has multiple sub-conditions', () => {
//         th.assert('It can take them as an array', () => [true, true, ...]);
//       });
//
//       th.context('When an assertion is temporarily pending', () => {
//         th.xassert('It can skip with [x]assert', () => true);
//       });
//     });
//   });
//   th.executeAssertions();
// ```

import __TestCasePrinter__ from './__TestCasePrinter__.js';

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
