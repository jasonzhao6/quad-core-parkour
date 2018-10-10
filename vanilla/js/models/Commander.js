export default class Commander {
  constructor({ core }) {
    // Proprs
    this.core = core;
  }

  move(source, destination) {
    if (!this.core.canReceive(source)) return false;
    if (!this.core.canSend(destination)) return false;

    return this.core.send(destination, this.core.receive(source));
  }
}
