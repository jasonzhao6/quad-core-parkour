import Director from './Director.js';

export default class Commander {
  constructor({ core }) {
    // Proprs
    this.core = core;
  }

  move(source, destination) {
    if ([
      Director.isDirection(source) && !this.core.canReceive(source),
      Director.isDirection(destination) && !this.core.canSend(destination),
    ].some(shortCircuit => shortCircuit === true)) return false;

    let sourceValue = null;

    if (Director.isDirection(source)) {
      sourceValue = this.core.receive(source);
    } else if (source === 'acc') {
      sourceValue = this.core.accumulator;
    }

    if (Director.isDirection(destination)) {
      this.core.send(destination, sourceValue);
    } else if (destination === 'acc') {
      this.core.accumulator = sourceValue;
    }

    return true;
  }
}
