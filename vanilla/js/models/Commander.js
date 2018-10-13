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

  sourceValue(source) {
    if (Director.isDirection(source)) return this.core.receive(source);
    if (source === 'acc') return this.core.accumulator;
    return source;
  }
}
