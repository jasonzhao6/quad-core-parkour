//
// This test harness enqueues assertions, shuffles them, then executes them.
// All assertions must be accompanied by `module > method > context`, like so:
// ```
//   th = new TestHarness(seed);
//   th.klass('Matrix', () => {
//     th.method('#hello', () => {
//       th.context('When ...', () => {
//         th.assert('It ...', () => true);
//         th.assert('It ...', () => false);
//       });
//
//       th.context('When ...', () => {
//         th.assert('It ...', () => true);
//         th.assert('It ...', () => false);
//       });
//     });
//   });
//   th.executeAssertions();
// ```

import __TestCasePrinter__ from './__TestCasePrinter__.js';

import './lib/js/seedrandom.js';

export default class TestHarness {
  constructor(seed) {
    this.seed = seed; // E.g '9/22/2018, 3:00:19 PM'.

    this.klassName = null; // E.g 'Matrix', 'Core'.
    this.methodName = null; // Either '#instanceMethod' or '.classMethod'.
    this.contextString = null; // 'When ...'. Note: Nesting is not supported.
    this.assertionString = null; // 'It ...'.

    this.queue = []; // [{ klassName, methodName, etc }, ...] for easy access.
    this.failures = []; // [[klassName, methodName, etc], ...] for sorting.
  }

  klass(name, block) {
    this.klassName = name;
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

  assert(string, block) {
    this.assertionString = string;
    this.enqueue(block);
  }

  executeAssertions() {
    this.shuffle();
    this.perform();
    this.print();
  }

  //
  // Private
  //

  enqueue(block) {
    this.queue.push({
      klassName: this.klassName,
      methodName: this.methodName,
      contextString: this.contextString,
      assertionString: this.assertionString,
      block,
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
      if (!testCase.block()) {
        this.failures.push([
          testCase.klassName,
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
