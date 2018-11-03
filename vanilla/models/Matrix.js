import Director from './Director.js';
import Escrow from './Escrow.js';

export default class Matrix {
  constructor({ rowCount, columnCount, Class }) {
    // Props
    this.rowCount = rowCount;
    this.columnCount = columnCount;

    // State
    this.aliases = {};
    this.escrow = new Escrow();

    // Create two stacks accessible to all elements.
    this.stackAbove = [];
    this.stackBelow = [];

    // Create a `rowCount` by `columnCount` matrix.
    // Note: Do this last in constructor as it passes `this` to each element.
    this.arrOfArr = new Array(rowCount);
    [...this.arrOfArr.keys()].forEach((i) => {
      this.arrOfArr[i] = new Array(columnCount);

      // If `Class` is passed in, populate each element with an instance of it.
      if (Class) {
        [...this.arrOfArr[i].keys()].forEach((j) => {
          // Inject into each instance a director to faciliate collaboration.
          const director = new Director({ i, j, matrix: this });
          this.arrOfArr[i][j] = new Class({ director });
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

    // `if (args.length === 1)`
    const { i, j } = this.aliases[args[0]];
    return this.arrOfArr[i][j];
  }

  getAll() {
    return this.arrOfArr.flat();
  }
}
