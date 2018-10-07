import Director from './Director.js';
import Escrow from './Escrow.js';

export default class Matrix {
  constructor({ rowCount, columnCount, Class }) {
    // Props
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.Class = Class;

    // States
    this.aliases = {};

    // Create an escrow for holding messages that elements send to each other.
    const escrow = new Escrow();

    // Create a `rowCount` by `columnCount` matrix.
    this.arrOfArr = new Array(this.rowCount);
    [...this.arrOfArr.keys()].forEach((i) => {
      this.arrOfArr[i] = new Array(this.columnCount);

      // Populate each element with a new `Class` instance.
      if (this.Class) {
        [...this.arrOfArr[i].keys()].forEach((j) => {
          // Create a director for each element, so they can find each other.
          const director = new Director({ i, j, matrix: this });

          // Inject both 1) element-specific director and 2) matrix-wide escrow.
          this.arrOfArr[i][j] = new this.Class({ director, escrow });
        });
      }
    });
  }

  alias(i, j, alias) {
    this.aliases[alias] = { i, j };
  }

  // Arguments: [i, j] or [alias].
  get(...args) {
    if (args.length === 2) return this.arrOfArr[args[0]][args[1]];

    // ... if (args.length === 1)
    const { i, j } = this.aliases[args[0]];
    return this.arrOfArr[i][j];
  }

  getAll() {
    return this.arrOfArr.flat();
  }
}
