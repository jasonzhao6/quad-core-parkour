/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor({ i, j, matrix } = { i: null, j: null, matrix: null }) {
    // Props
    this.i = i;
    this.j = j;
    this.matrix = matrix;

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
