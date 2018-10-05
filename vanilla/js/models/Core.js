/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor(director) {
    // Props
    this.director = director;

    // States
    // this.ins = {
    //   [Core.DIRECTIONS.UP]: null,
    //   [Core.DIRECTIONS.DOWN]: null,
    //   [Core.DIRECTIONS.LEFT]: null,
    //   [Core.DIRECTIONS.RIGHT]: null,
    // };
    this.accumulator = Core.DEFAULT_VALUE;
    this.backup = Core.DEFAULT_VALUE;
  }

  //
  // Delegated
  //

  up() { return this.director.up(); }
  down() { return this.director.down(); }
  left() { return this.director.left(); }
  right() { return this.director.right(); }

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
