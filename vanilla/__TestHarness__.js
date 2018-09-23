//
// This test harness enqueues assertions, shuffles them, then executes them.
// All assertions must be accompanied by `Class > method > context`, like so:
// ```
//   th = new TestHarness(seed);
//   th.Class(Matrix, () => {
//     th.method('#hello', () => {
//       th.context('When ...', () => {
//         th.assert('It ...', () => true);
//         th.assert('It ...', () => [true, true, ...]);
//       });
//
//       th.context('When ...', () => {
//         th.xassert('It ...', () => false);
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

    this.className = null; // E.g 'Matrix', 'Core'.
    this.methodName = null; // Either '#instanceMethod' or '.classMethod'.
    this.contextString = null; // 'When ...'. Note: Nesting is not supported.
    this.assertionString = null; // 'It ...'.

    this.queue = []; // [{ className, methodName, etc }, ...] for easy access.
    this.failures = []; // [[className, methodName, etc], ...] for sorting.
    this.pendingCount = 0;
  }

  Class(Class, block) {
    this.className = Class.name;
    block();
  }

  method(name, block) {
    this.methodName = name;
    block();
  }

  context(string, block) {
    this.contextString = string;
    block();
  }

  assert(string, assertion) {
    this.assertionString = string;
    this.enqueue(assertion);
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
