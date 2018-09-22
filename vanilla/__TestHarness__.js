//
// This test harness enqueues assertions, shuffles them, then executes them.
// All assertions must be accompanied by `module > method > context`, like so:
// ```
//   th = new TestHarness(seed);
//   th.module('Matrix', () => {
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

export default class TestHarness {
  constructor(seed) {
    this.seed = seed; // E.g '9/22/2018, 3:00:19 PM'.

    this.moduleName = null; // E.g 'Matrix', 'Core'.
    this.methodName = null; // E.g '#instanceMethod', '.classMethod'.
    this.contextString = null; // E.g 'When ...'. Note: No support for nesting.
    this.assertionString = null; // E.g 'It ...'. Note: No support for nesting.

    this.queue = [];
  }

  module(name, block) {
    this.moduleName = name;
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
  }

  //
  // Private
  //

  enqueue(block) {
    this.queue.push({
      moduleName: this.moduleName,
      methodName: this.methodName,
      contextString: this.contextString,
      assertionString: this.assertionString,
      block,
    });
  }

  shuffle() {
    // Fisher-Yates shuffle
    for (let i = this.queue.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.queue[i];
      this.queue[i] = this.queue[j];
      this.queue[j] = temp;
    }
  }

  perform() {
    // console.log(this.queue);
    this.queue.forEach((testCase) => {
      testCase.block();
    });
  }
}
