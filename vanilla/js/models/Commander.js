export default class Commander {
  constructor({ core }) {
    // Proprs
    this.core = core;
  }

  move(source, destination) {
    if (this.core[source] && this.core[destination]) return false;

    // Reset source

    // Set destination

    return true;
  }
}
