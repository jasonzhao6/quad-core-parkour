export default class LineManager {
  constructor({ core } = {}) {
    // Props
    this.core = core;

    // States
    this.lines = [];
    this.gotoLine = null;
    this.priorities = this.prioritizer();
  }

  loadLines(lines) {
    this.lines = lines;
    this.gotoLine = null;
  }

  nextLine(redoPrevious) {
    const line = this.priorities.next(redoPrevious).value;
    return this.core === undefined ? line : this.executeLine(line);
  }

  gotoLabel(label) {
    this.gotoLine = this.lines.findIndex(line => line.startsWith(`${label}:`));
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

    const [head, tail] = line.split(': ');
    const [command, arg1, arg2] = (tail || head).split(' ');

    switch (command) {
      case 'mov': return this.core.move(arg1, arg2);
      case 'add': return this.core.add(arg1);
      case 'sub': return this.core.subtract(arg1);

      default: return undefined;
    }
  }
}
