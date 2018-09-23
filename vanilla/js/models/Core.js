export default class Core {
  constructor({ i, j, matrix } = { i: null, j: null, matrix: null }) {
    this.i = i;
    this.j = j;
    this.matrix = matrix;

    this.accumulator = 0;
    this.backup = 0;
  }
}
