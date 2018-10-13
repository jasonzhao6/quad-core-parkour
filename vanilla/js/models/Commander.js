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

    if (Director.isDirection(destination)) {
      this.core.send(destination, this.sourceValue(source));
    } else if (destination === 'acc') {
      this.core.accumulator = this.sourceValue(source);
    }

    return true;
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
