import Level from '../Level.js';
import Matrix from '../Matrix.js';

export default class LevelTest {
  static enqueue(_) {
    _.Class('Level', () => {
      _.method('#constructor', () => {
        _.context('When creating Level 0', () => {
          const number = 0;
          const goBig = true;
          const maxCycleCountOverride = 10;
          const subject = new Level({ number, goBig, maxCycleCountOverride });

          _.assert(
            'It initializes properties',
            () => [
              subject.number === number,
              subject.goBig === goBig,
              subject.maxCycleCountOverride === maxCycleCountOverride,
            ],
          );

          _.assert(
            'It initializes `givenInput`, `expectedOutput` and `solution` data',
            () => [
              subject.givenInputX instanceof Array,
              subject.givenInputY instanceof Array,
              subject.expectedOutputX instanceof Array,
              subject.expectedOutputY instanceof Array,
              subject.solution.lines instanceof Object,
            ],
          );

          _.assert(
            'It initializes the `cycleCount` state to 0',
            () => subject.cycleCount === 0,
          );

          _.assert(
            'It initializes the `cycleReturnValues` state to []',
            () => [
              subject.cycleReturnValues instanceof Array,
              subject.cycleReturnValues.length === 0,
            ],
          );

          _.assert(
            'It initializes the `matrix` state to an instance of Matrix',
            () => subject.matrix instanceof Matrix,
          );

          _.assert(
            'It aliases the input/output x/y elements in the `matrix`',
            () => [
              subject.matrix.get(Level.INPUT.X) instanceof Object,
              subject.matrix.get(Level.INPUT.Y) instanceof Object,
              subject.matrix.get(Level.OUTPUT.X) instanceof Object,
              subject.matrix.get(Level.OUTPUT.Y) instanceof Object,
            ],
          );

          _.assert(
            'It aliases `this.escrow` to that of the `matrix`',
            () => subject.escrow === subject.matrix.escrow,
          );

          _.assert(
            'It initializes the `inputX` state to a copy of input data',
            () => [
              subject.inputX !== subject.givenInputX,
              subject.inputX.join() === subject.givenInputX.join(),
            ],
          );

          _.assert(
            'It initializes the `inputY` state to a copy of input data',
            () => [
              subject.inputY !== subject.givenInputY,
              subject.inputY.join() === subject.givenInputY.join(),
            ],
          );

          _.assert(
            'It initializes the `outputX` state to an empty array',
            () => [
              subject.outputX instanceof Array,
              subject.outputX.length === 0,
            ],
          );

          _.assert(
            'It initializes the `outputY` state to an empty array',
            () => [
              subject.outputY instanceof Array,
              subject.outputY.length === 0,
            ],
          );
        });

        _.context('When creating a level with `dataOverride`', () => {
          const number = 0;
          const input = { x: [], y: [] };
          const output = { x: [], y: [] };
          const solution = 'solution';
          const dataOverride = { input, output, solution };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It overrides `givenInput`, `expectedOutput`, and `solution`',
            () => [
              subject.givenInputX === dataOverride.input.x,
              subject.givenInputY === dataOverride.input.y,
              subject.expectedOutputX === dataOverride.output.x,
              subject.expectedOutputY === dataOverride.output.y,
              subject.solution === dataOverride.solution,
            ],
          );
        });

        _.context('When creating a level without any input nor output', () => {
          const number = 0;
          const dataOverride = { input: {}, output: {} };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes input and output states to empty arrays',
            () => [
              subject.inputX.length === 0,
              subject.inputY.length === 0,
              subject.outputX.length === 0,
              subject.outputY.length === 0,
            ],
          );
        });

        _.context('When creating a level with one input', () => {
          const number = 0;
          const inputX = [1];
          const dataOverride = { input: { x: inputX }, output: {} };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes only one input',
            () => [
              subject.inputX.toString() === inputX.toString(),
              subject.inputY.length === 0,
            ],
          );
        });

        _.context('When creating a level with two inputs', () => {
          const number = 0;
          const [inputX, inputY] = [[1], [2]];
          const output = { x: [3], y: [4] };
          const dataOverride = { input: { x: inputX, y: inputY }, output };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes both inputs',
            () => [
              subject.inputX.toString() === inputX.toString(),
              subject.inputY.toString() === inputY.toString(),
            ],
          );
        });
      });

      _.method('#cycle', () => {
        _.context('When playing Level 0, and there is no solution', () => {
          const number = 0;
          const maxCycleCountOverride = 100;
          const subject = new Level({ number, maxCycleCountOverride });

          _.assert(
            'It cycles until `maxCycleCountOverride` is reached',
            () => subject.cycle() === maxCycleCountOverride,
          );
        });

        [...new Array(1 + 16).keys()].splice(0).forEach((i) => {
          _.context(`When playing Level ${i}, and there is a solution`, () => {
            const [number, goBig] = [i, false];
            const subject = new Level({ number, goBig });

            subject.solve();

            // Uncomment for debugging
            // -----------------------
            // console.log('cycleCount', subject.cycle());
            // console.log('inputX', subject.givenInputX);
            // console.log('inputY', subject.givenInputY);
            // console.log('matrix', subject.matrix.getAll());
            // console.log('escrow', JSON.stringify(subject.escrow.messages));
            // console.log('stackAbove', subject.matrix.stackAbove);
            // console.log('stackBelow', subject.matrix.stackBelow);
            // console.log('outputX', subject.outputX);
            // console.log('outputX', subject.expectedOutputX);
            // console.log('outputY', subject.outputY);
            // console.log('outputY', subject.expectedOutputY);
            // debugger;

            _.assert(
              'It has at most 15 lines per core',
              () => Object.values(subject.solution.lines)
                .map(lines => lines.length <= 15),
            );

            _.assert(
              'It finishes with the expected `cycleCount`',
              () => subject.cycle() === (goBig
                ? subject.solution.cycleCountBig
                : subject.solution.cycleCount),
            );
          });
        });
      });
    });
  }
}
