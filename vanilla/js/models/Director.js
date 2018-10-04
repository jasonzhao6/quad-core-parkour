/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

export default class Director {
  static get DIRECTIONS() {
    return { UP: 'up', DOWN: 'down', LEFT: 'left', RIGHT: 'right' };
  }

  static reverse(direction) {
    const { UP, DOWN, LEFT, RIGHT } = Director.DIRECTIONS;

    if (direction === UP) return DOWN;
    if (direction === DOWN) return UP;
    if (direction === LEFT) return RIGHT;

    // ... if (direction === RIGHT)
    return LEFT;
  }

  constructor({ i, j, matrix }) {
    // Props
    this.i = i;
    this.j = j;
    this.matrix = matrix;
  }

  up() {
    if (this.i - 1 === -1) return null;
    return this.matrix.get(this.i - 1, this.j);
  }

  down() {
    if (this.i + 1 === this.matrix.rowCount) return null;
    return this.matrix.get(this.i + 1, this.j);
  }

  left() {
    if (this.j - 1 === -1) return null;
    return this.matrix.get(this.i, this.j - 1);
  }

  right() {
    if (this.j + 1 === this.matrix.columnCount) return null;
    return this.matrix.get(this.i, this.j + 1);
  }
}
