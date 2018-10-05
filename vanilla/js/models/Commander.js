export default class Commander {
  constructor(director) {
  }

  move(source, destination) {
    // TODO if cannot proceed
    if (false) return false;

    const value = this.ins[source];

    // Reset source
    this.ins[source] = null;

    // Set destination
    this.outs[destination] = value;
    if (this[destination]() !== null) {
      this[destination]().ins[Core.reverse(destination)] = value;
    }

    return true;
  }
}
