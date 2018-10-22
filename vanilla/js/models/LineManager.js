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

  nextLine(redo) {
    const line = this.priorities.next(redo).value;
    return this.core === undefined ? line : this.executeLine(line);
  }

  gotoLabel(label) {
    this.gotoLine = this.lines.findIndex(line => line.startsWith(`${label}: `));
  }

  //
  // Private
  //

  * prioritizer() {
    for (let i = 0; i < Infinity; i += 1) {
      // Handle goto
      if (this.gotoLine !== null) {
        i = this.gotoLine;
        this.gotoLine = null;
      }

      const line = this.lines[i % this.lines.length];

      // Handle redo
      const redo = yield line;
      if (redo === true) i -= 1;
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
      case 'neg': return this.core.negate();
      case 'jmp': return this.core.jump(arg1);
      case 'jez': return this.core.jumpIfZero(arg1);
      case 'jgz': return this.core.jumpIfPositive(arg1);
      case 'sav': return this.core.save();
      case 'swp': return this.core.swap();

      default: return undefined;
    }
  }
}
