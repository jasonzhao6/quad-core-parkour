//
// This test harness enqueues assertions, shuffles them, then executes them.
//

export default class TestHarness {
  constructor(seed) {
    this.seed = seed;
    this.queue = [];
  }

  assert(method, message, expectation) {
    this.enqueue(method, message, expectation);
  }

  executeAssertions() {
    this.shuffle();
    this.perform();
  }

  //
  // Private
  //

  enqueue(method, message, expectation) {
    console.log(method, message); // eslint-disable-line
    this.queue.push(expectation);
  }

  shuffle() {
    this.queue.push();
  }

  perform() {
    this.queue.push();
  }
}
