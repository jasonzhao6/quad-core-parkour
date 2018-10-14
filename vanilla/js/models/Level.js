// Models
import Core from './Core.js';
import Matrix from './Matrix.js';

// Level data
import data from './Level/data/all.js';
import solutions from './Level/solutions/all.js';

export default class Level {
  static get MATRIX_SIZE() { return { rowCount: 2, columnCount: 2 }; }

  static get INPUT() { return { X: 'input.x', Y: 'input.y' }; }
  static get OUTPUT() { return { X: 'output.x', Y: 'output.y' }; }

  constructor({ number, dataOverride }) {
    // Props
    this.number = number;
    this.data = dataOverride || data[number];

    // States
    this.matrix = new Matrix({ ...Level.MATRIX_SIZE, Class: Core });
    this.inputX = this.data.input.x ? [...this.data.input.x] : null;
    this.inputY = this.data.input.y ? [...this.data.input.y] : null;
    this.outputX = this.data.output.x ? [] : null;
    this.outputY = this.data.output.y ? [] : null;
  }

  run() {
    // this.matrix.getAll().forEach(core => core.step());
    //
    // if (
    //   (this.hasOutputX && this.outputX.length !== this.data.output.x.length) ||
    //   (this.hasOutputY && this.outputY.length !== this.data.output.y.length)
    // ) {
    //   this.cycle();
    // }
  }

  //
  // private
  //

  solve() {}
}
