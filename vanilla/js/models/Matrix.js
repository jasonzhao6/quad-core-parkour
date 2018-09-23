export default class Matrix {
  constructor({ rowCount, columnCount, Class }) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.Class = Class;

    // Create a `rowCount * columnCount` matrix.
    this.arrOfArr = new Array(this.rowCount);
    [...this.arrOfArr.keys()].forEach((i) => {
      this.arrOfArr[i] = new Array(this.columnCount);

      // Populate each element with a unique `Class` instances.
      if (this.Class) {
        [...this.arrOfArr[i].keys()].forEach((j) => {
          this.arrOfArr[i][j] = new this.Class({ i, j, matrix: this });
        });
      }
    });
  }
}
