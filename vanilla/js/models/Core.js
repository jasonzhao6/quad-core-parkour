/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor({ director }) {
    // Props
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
  // canSend(direction) {}
  // canReceive(direction) {}
  // send(direction, message) {}
  // receive(direction) {}

  // Commands via `commander`
  // move(source, destination) {}
}
