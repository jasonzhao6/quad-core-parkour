// Models
import Core from './Core.js';
import Matrix from './Matrix.js';

// Level data
import levelData from './levelData/all.js';

export default class Level {
  static get MAX_CYCLE_COUNT() { return 10000; }

  static get MATRIX_SIZE() { return { rowCount: 2, columnCount: 2 }; }
  static get INPUT() { return { X: 'input.x', Y: 'input.y' }; }
  static get OUTPUT() { return { X: 'output.x', Y: 'output.y' }; }

  // eslint-disable-next-line object-curly-newline
  constructor({ number, goBig, maxCycleCountOverride, dataOverride }) {
    // Props
    this.maxCycleCount = maxCycleCountOverride || Level.MAX_CYCLE_COUNT;

    // Data
    const data = dataOverride || levelData[number];
    this.number = number;
    this.title = data.title;
    this.info = data.info;
    this.givenInputX = (goBig ? data.input.xBig : data.input.x) || [];
    this.givenInputY = (goBig ? data.input.yBig : data.input.y) || [];
    this.expectedOutputX = (goBig ? data.output.xBig : data.output.x) || [];
    this.expectedOutputY = (goBig ? data.output.yBig : data.output.y) || [];
    this.solution = data.solution;

    // State
    this.cycleCount = 0;
    this.cycleReturnValues = [];
    this.matrix = new Matrix({ ...Level.MATRIX_SIZE, Class: Core });
    this.matrix.alias(0, 0, Level.INPUT.X);
    this.matrix.alias(0, 1, Level.INPUT.Y);
    this.matrix.alias(1, 0, Level.OUTPUT.X);
    this.matrix.alias(1, 1, Level.OUTPUT.Y);
    this.escrow = this.matrix.escrow;
    this.inputX = [...this.givenInputX];
    this.inputY = [...this.givenInputY];
    this.outputX = [];
    this.outputY = [];
  }

  cycle() {
    do {
      this.cycleCount += 1;

      this.depositInputs();

      this.matrix.getAll().forEach((element, i) => {
        const redo = this.cycleReturnValues[i] === Core.REDO;
        this.cycleReturnValues[i] = element.nextLine(redo);
      });

      this.withdrawOutputs();
    } while (this.shouldCycleAgain());

    return this.cycleCount;
  }

  //
  // Private
  //

  depositInputs() {
    const inputX = this.matrix.get(Level.INPUT.X);
    const inputY = this.matrix.get(Level.INPUT.Y);

    if (this.inputX.length > 0 && !inputX.canReceive('up')) {
      this.escrow.deposit('up', inputX.name(), this.inputX.shift());
    }

    if (this.inputY.length > 0 && !inputY.canReceive('up')) {
      this.escrow.deposit('up', inputY.name(), this.inputY.shift());
    }
  }

  withdrawOutputs() {
    const outputX = this.matrix.get(Level.OUTPUT.X);
    const outputY = this.matrix.get(Level.OUTPUT.Y);

    if (!outputX.canSend('down')) {
      this.outputX.push(this.escrow.withdraw(outputX.name(), 'down'));
    }

    if (!outputY.canSend('down')) {
      this.outputY.push(this.escrow.withdraw(outputY.name(), 'down'));
    }
  }

  shouldCycleAgain() {
    if (this.cycleCount >= this.maxCycleCount) return false;

    return [
      this.outputX.join() === this.expectedOutputX.join(),
      this.outputY.join() === this.expectedOutputY.join(),
    ].some(condition => condition === false);
  }

  solve() {
    Object.keys(this.solution.lines).forEach((key) => {
      const [i, j] = key.split(',');
      const lines = this.solution.lines[key];
      this.matrix.get(i, j).loadLines(lines);
    });
  }
}
