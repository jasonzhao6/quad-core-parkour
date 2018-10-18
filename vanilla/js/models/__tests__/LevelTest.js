import Level from '../Level.js';
import Matrix from '../Matrix.js';

export default class LevelTest {
  static enqueue(_) {
    _.Class('Level', () => {
      _.method('#constructor', () => {
        _.context('When creating a level', () => {
          const number = 0;
          const subject = new Level({ number });

          _.assert(
            'It initializes the `number` property',
            () => subject.number === number,
          );

          _.assert(
            'It initializes the `cycleCount` state to 0',
            () => subject.cycleCount === 0,
          );

          _.assert(
            'It initializes the `matrix` state to an instance of Matrix',
            () => subject.matrix instanceof Matrix,
          );

          _.assert(
            'It aliases the input/output x/y elements in the `matrix`',
            () => [
              typeof subject.matrix.get(Level.INPUT.X) === 'object',
              typeof subject.matrix.get(Level.INPUT.Y) === 'object',
              typeof subject.matrix.get(Level.OUTPUT.X) === 'object',
              typeof subject.matrix.get(Level.OUTPUT.Y) === 'object',
            ],
          );
        });

        _.context('When creating a level without `dataOverride`', () => {
          const number = 0;
          const subject = new Level({ number });

          _.assert(
            'It initializes the `data` property with imported data',
            () => [
              subject.data.input.x.length > 0,
              subject.data.input.y.length > 0,
              subject.data.output.x.length > 0,
              subject.data.output.y.length > 0,
            ],
          );
        });

        _.context('When creating a level without `dataOverride`', () => {
          const number = 0;
          const dataOverride = { input: {}, output: {} };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes the `data` property with `dataOverride`',
            () => subject.data === dataOverride,
          );
        });

        _.context('When creating a level without any input nor output', () => {
          const number = 0;
          const dataOverride = { input: {}, output: {} };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes input and output states to empty array',
            () => [
              subject.inputX.length === 0,
              subject.inputY.length === 0,
              subject.outputX.length === 0,
              subject.outputY.length === 0,
            ],
          );
        });

        _.context('When creating a level with one input and one output', () => {
          const number = 0;
          const inputX = [1];
          const dataOverride = { input: { x: inputX }, output: { x: [2] } };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes only one input and output states each',
            () => [
              subject.inputX.toString() === inputX.toString(),
              subject.inputY.length === 0,
              subject.outputX.length === 0,
              subject.outputY.length === 0,
            ],
          );
        });

        _.context('When creating a level with two inputs and outputs', () => {
          const number = 0;
          const [inputX, inputY] = [[1], [2]];
          const output = { x: [3], y: [4] };
          const dataOverride = { input: { x: inputX, y: inputY }, output };
          const subject = new Level({ number, dataOverride });

          _.assert(
            'It initializes only one input and output states each',
            () => [
              subject.inputX.toString() === inputX.toString(),
              subject.inputY.toString() === inputY.toString(),
              subject.outputX.length === 0,
              subject.outputY.length === 0,
            ],
          );
        });
      });

      _.method('#cycle', () => {
        _.context('When playing Level 0, and there is no solution', () => {
          const number = 0;
          const subject = new Level({ number });

          subject.cycle();

          _.assert(
            'It cycles until `MAX_CYCLE_COUNT` is reached',
            () => subject.cycleCount === Level.MAX_CYCLE_COUNT,
          );
        });

        [...new Array(2).keys()].forEach((i) => {
          _.context(`When playing Level ${i}, and there is a solution`, () => {
            const number = 0;
            const subject = new Level({ number });

            subject.solve();
            subject.cycle();

            _.assert(
              'It finishes before `MAX_CYCLE_COUNT` is reached',
              () => subject.cycleCount < Level.MAX_CYCLE_COUNT,
            );
          });
        });
      });
    });
  }
}
