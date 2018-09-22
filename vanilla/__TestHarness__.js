//
// This test harness enqueues assertions, shuffles them, then executes them.
//

export default class TestHarness {
  constructor(seed) {
    this.seed = seed; // E.g '9/22/2018, 3:00:19 PM'.
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
