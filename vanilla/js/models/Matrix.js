export default class Matrix {
  constructor({ rowCount, columnCount, Class }) {
    // Props
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.Class = Class;

    // States
    this.aliases = {};

    // Create a `rowCount * columnCount` matrix.
    this.arrOfArr = new Array(this.rowCount);
    [...this.arrOfArr.keys()].forEach((i) => {
      this.arrOfArr[i] = new Array(this.columnCount);

      // Populate each element with a unique `Class` instance.
      if (this.Class) {
        [...this.arrOfArr[i].keys()].forEach((j) => {
          this.arrOfArr[i][j] = new this.Class({ i, j, matrix: this });
        });
      }
    });
  }

  alias(i, j, alias) {
    this.aliases[alias] = { i, j };
  }

  get(...args) { // Arguments: [i, j] or [alias].
    if (args.length === 2) return this.arrOfArr[args[0]][args[1]];

    // ... if (args.length === 1)
    const { i, j } = this.aliases[args[0]];
    return this.arrOfArr[i][j];
  }

  getAll() {
    return this.arrOfArr.flat();
  }
}
