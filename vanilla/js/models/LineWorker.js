import Director from './Director.js';

export default class LineWorker {
  static get REDO() { return 'redo'; }

  constructor({ core }) {
    // Props
    this.core = core;
  }

  add(source) {
    if (this.cannotReceive(source)) return LineWorker.REDO;

    this.core.accumulator += this.sourceValue(source);
    return true;
  }

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

    // In case destination is not valid
    return false;
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
