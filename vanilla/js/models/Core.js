export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor({ i, j, matrix } = { i: null, j: null, matrix: null }) {
    // Props
    this.i = i;
    this.j = j;
    this.matrix = matrix;

    // States
    this.accumulator = Core.DEFAULT_VALUE;
    this.backup = Core.DEFAULT_VALUE;
  }

  //
  // Neighbors
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
}
