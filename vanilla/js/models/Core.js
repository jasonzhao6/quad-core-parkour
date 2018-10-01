/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

export default class Core {
  static get DEFAULT_VALUE() { return 0; }
  static get DIRECTIONS() {
    return { UP: 'up', DOWN: 'down', LEFT: 'left', RIGHT: 'right' };
  }

  constructor({ i, j, matrix } = { i: null, j: null, matrix: null }) {
    // Props
    this.i = i;
    this.j = j;
    this.matrix = matrix;

    // States
    this.ins = {
      [Core.DIRECTIONS.UP]: null,
      [Core.DIRECTIONS.DOWN]: null,
      [Core.DIRECTIONS.LEFT]: null,
      [Core.DIRECTIONS.RIGHT]: null,
    };
    this.accumulator = Core.DEFAULT_VALUE;
    this.backup = Core.DEFAULT_VALUE;
  }

  //
  // Directions
  //

  up() {
    const neighborI = this.i - 1;
    const neighborJ = this.j;

    if (neighborI === -1) return null;

    return this.matrix.get(neighborI, neighborJ);
  }

  down() {
    const neighborI = this.i + 1;
    const neighborJ = this.j;

    if (neighborI === this.matrix.rowCount) return null;

    return this.matrix.get(neighborI, neighborJ);
  }

  left() {
    const neighborI = this.i;
    const neighborJ = this.j - 1;

    if (neighborJ === -1) return null;

    return this.matrix.get(neighborI, neighborJ);
  }

  right() {
    const neighborI = this.i;
    const neighborJ = this.j + 1;

    if (neighborJ === this.matrix.columnCount) return null;

    return this.matrix.get(neighborI, neighborJ);
  }

  //
  // Commands
  //

  move(source, destination) {
    const value = this.ins[source];

    // Reset source
    this.ins[source] = null;

    // Set destination
    this[destination]().ins[Core.reverse(destination)] = value;
  }

  //
  // Private
  //

  static reverse(direction) {
    if (direction === Core.DIRECTIONS.UP) return Core.DIRECTIONS.DOWN;
    if (direction === Core.DIRECTIONS.DOWN) return Core.DIRECTIONS.UP;
    if (direction === Core.DIRECTIONS.LEFT) return Core.DIRECTIONS.RIGHT;

    // if (direction === Core.DIRECTIONS.RIGHT)
    return Core.DIRECTIONS.LEFT;
  }
}
