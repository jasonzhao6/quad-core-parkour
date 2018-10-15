export default class LineManager {
  constructor({ core } = {}) {
    // Props
    this.core = core;

    // States
    this.lines = [];
    this.priorities = this.prioritize();
  }

  loadLines(lines) { this.lines = lines; }

  nextLine(redoPrevious) {
    return this.priorities.next(redoPrevious);
  }

  //
  // Private
  //

  * prioritize() {
    for (let i = 0; i < Infinity; i += 1) {
      const redoPrevious = yield this.lines[i % this.lines.length];
      if (redoPrevious === true) i -= 1;
    }
  }
}
