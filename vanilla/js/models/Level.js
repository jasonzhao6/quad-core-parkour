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
    this.inputX = this.data.input.x === undefined ? [] : [...this.data.input.x];
    this.inputY = this.data.input.y === undefined ? [] : [...this.data.input.y];
    this.outputX = [];
    this.outputY = [];
    this.matrix = new Matrix({ ...Level.MATRIX_SIZE, Class: Core });
  }

  cycle() {
    this.cycleCount += 1;
    this.matrix.getAll().forEach(element => element.nextLine());

    if (this.shouldCycleAgain()) this.cycle();
  }

  //
  // Private
  //

  shouldCycleAgain() {
    if (this.cycleCount >= Level.MAX_CYCLE_COUNT) return false;

    return [
      this.outputX !== null && this.outputX.length < this.data.output.x.length,
      this.outputY !== null && this.outputY.length < this.data.output.y.length,
    ].some(condition => condition === true);
  }

  //
  // Testing
  //

  solve() {
    const solution = solutions[this.number];

    Object.keys(solution).forEach((key) => {
      const [i, j] = key.split(':');
      const lines = solution[key];

      this.matrix.get(i, j).loadLines(lines);
    });
  }
}
