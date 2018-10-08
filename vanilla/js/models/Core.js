/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor({ director }) {
    // Prop
    this.director = director;

    // States
    this.accumulator = Core.DEFAULT_VALUE;
    this.backup = Core.DEFAULT_VALUE;
  }

  //
  // Delegated
  //

  // Directions via `director`
  up() { return this.director.up(); }
  down() { return this.director.down(); }
  left() { return this.director.left(); }
  right() { return this.director.right(); }

  // Messaging via `director`
  // send(direction, message) {}
  // receive(direction) {}

  //
  // Commands
  //

  move(source, destination) {
    // const value = this.ins[source];
    //
    // // Reset source
    // this.ins[source] = null;
    //
    // // Set destination
    // this[destination]().ins[Core.reverse(destination)] = value;
  }

  //
  // Private
  //
}
