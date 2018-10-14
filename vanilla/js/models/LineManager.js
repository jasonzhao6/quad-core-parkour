export default class LineManager {
  constructor({ core } = {}) {
    // Props
    this.core = core;

    // States
    this.lineItems = [];
    this.priorities = this.prioritize();
  }

  load(lineItems) { this.lineItems = lineItems; }

  next(redoPrevious) {
    return this.priorities.next(redoPrevious);
  }

  //
  // Private
  //

  * prioritize() {
    for (let i = 0; i < Infinity; i += 1) {
      const redoPrevious = yield this.lineItems[i % this.lineItems.length];
      if (redoPrevious === true) i -= 1;
    }
  }
}
