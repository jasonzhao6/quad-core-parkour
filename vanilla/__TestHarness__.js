//
// This test harness enqueues assertions, shuffles them, then executes them.
//

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
    // this.queue.push();
  }

  perform() {
    // console.log(this.queue);
    this.queue.forEach((testCase) => {
      testCase.block();
    });
  }
}
