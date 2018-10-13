export default class LineManager {
  constructor({ core } = {}) {
    // Props
    this.core = core;

    // States
    this.lineItems = [];
    this.priorities = this.prioritize();
  }

  load(lineItems) { this.lineItems = lineItems; }

  next({ repeatPrevious } = {}) {
    return this.priorities.next(repeatPrevious);
  }

  //
  // Private
  //

  * prioritize() {
    for (let i = 0; i < Infinity; i += 1) {
      const repeatPrevious = yield this.lineItems[i % this.lineItems.length];
      if (repeatPrevious === true) i -= 1;
    }
  }
}
