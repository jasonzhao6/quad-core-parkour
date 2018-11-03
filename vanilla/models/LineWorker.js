import Director from './Director.js';

export default class LineWorker {
  static get REDO() { return 'redo'; }

  constructor({ core }) {
    // Props
    this.core = core;
  }

  //
  // Pipelining
  //

  move(source, destination) {
    if (this.cannotReceive(source)) return LineWorker.REDO;
    if (this.cannotSend(destination)) return LineWorker.REDO;

    const sourceValue = this.sourceValue(source);

    if (Director.isDirection(destination)) {
      return this.core.send(destination, sourceValue);
    } else if (destination === 'acc') {
      this.core.accumulator = sourceValue;
      return true;
    }

    // In case destination is not valid.
    return false;
  }

  //
  // Arithmetic
  //

  add(source) {
    if (this.cannotReceive(source)) return LineWorker.REDO;

    this.core.accumulator += this.sourceValue(source);
    return this.core.accumulator;
  }

  subtract(source) {
    if (this.cannotReceive(source)) return LineWorker.REDO;

    this.core.accumulator -= this.sourceValue(source);
    return this.core.accumulator;
  }

  negate() {
    this.core.accumulator = -this.core.accumulator;
  }

  //
  // Branching
  //

  jump(label) {
    return this.core.gotoLabel(label);
  }

  jumpIfZero(label) {
    if (this.core.accumulator === 0) return this.core.gotoLabel(label);
    return false;
  }

  jumpIfPositive(label) {
    if (this.core.accumulator > 0) return this.core.gotoLabel(label);
    return false;
  }

  //
  // Memory
  //

  save() {
    this.core.backup = this.core.accumulator;
  }

  swap() {
    const { core } = this;
    [core.accumulator, core.backup] = [core.backup, core.accumulator];
  }

  //
  // Private
  //

  cannotReceive(source) {
    return Director.isDirection(source) && !this.core.canReceive(source);
  }

  cannotSend(destination) {
    return Director.isDirection(destination) && !this.core.canSend(destination);
  }

  sourceValue(source) {
    if (Director.isDirection(source)) return this.core.receive(source);
    if (source === 'acc') return this.core.accumulator;
    return parseInt(source, 10);
  }
}
