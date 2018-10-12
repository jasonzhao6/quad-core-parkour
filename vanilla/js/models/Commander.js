export default class Commander {
  constructor({ core }) {
    // Proprs
    this.core = core;
  }

  move(source, destination) {
    let sourceValue = null;

    if (source === 'acc') sourceValue = this.core.accumulator;

    if (sourceValue === null) {
      if (!this.core.canReceive(source)) return false;
      sourceValue = this.core.receive(source);
    }

    if (!this.core.canSend(destination)) return false;

    return this.core.send(destination, sourceValue);
  }
}
