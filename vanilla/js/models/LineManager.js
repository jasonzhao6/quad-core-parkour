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
    if (this.core === undefined) return line;
    return this.executeLine(line);
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
    if (line === undefined) return undefined;

    const [command, arg1, arg2] = line.split(' ');

    switch (command) {
      case 'add': return this.core.add(arg1);
      case 'mov': return this.core.move(arg1, arg2);

      default: return undefined;
    }
  }
}
