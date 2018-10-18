export default class LineManager {
  constructor({ core } = {}) {
    // Props
    this.core = core;

    // States
    this.lines = [];
    this.priorities = this.prioritizer();
  }

  loadLines(lines) { this.lines = lines; }

  nextLine(redoPrevious) {
    const line = this.priorities.next(redoPrevious).value;
    if (this.core !== undefined) this.executeLine(line);
    return line;
  }

  //
  // Private
  //

  * prioritizer() {
    for (let i = 0; i < Infinity; i += 1) {
      const redoPrevious = yield this.lines[i % this.lines.length];
      if (redoPrevious === true) i -= 1;
    }
  }

  executeLine(line) {
    // TODO Implement parser
    if (line) this.core.move('up', 'down');
  }
}
