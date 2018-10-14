// Models
import Core from './Core.js';
import Matrix from './Matrix.js';

// Level data
import data from './Level/data/all.js';
import solutions from './Level/solutions/all.js';

export default class Level {
  static get MAX_CYCLE_COUNT() { return 100; }

  static get MATRIX_SIZE() { return { rowCount: 2, columnCount: 2 }; }

  static get INPUT() { return { X: 'input.x', Y: 'input.y' }; }
  static get OUTPUT() { return { X: 'output.x', Y: 'output.y' }; }

  constructor({ number, dataOverride }) {
    // Props
    this.number = number;
    this.data = dataOverride || data[number];

    // States
    this.cycleCount = 0;
    this.matrix = new Matrix({ ...Level.MATRIX_SIZE, Class: Core });
    this.inputX = this.data.input.x ? [...this.data.input.x] : null;
    this.inputY = this.data.input.y ? [...this.data.input.y] : null;
    this.outputX = this.data.output.x ? [] : null;
    this.outputY = this.data.output.y ? [] : null;
  }

  cycle() {
    this.cycleCount += 1;
    this.matrix.getAll().forEach(core => core.next());

    if (this.shouldCycleAgain()) this.cycle();
  }

  //
  // private
  //

  shouldCycleAgain() {
    if (this.cycleCount >= Level.MAX_CYCLE_COUNT) return false;

    return [
      this.outputX !== null && this.outputX.length < this.data.output.x.length,
      this.outputY !== null && this.outputY.length < this.data.output.y.length,
    ].some(condition => condition === true);
  }

  solve() {}
}
