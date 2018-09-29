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
}
