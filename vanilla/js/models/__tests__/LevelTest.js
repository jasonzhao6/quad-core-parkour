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
            'It initializes input and output states to `null`',
            () => [
              subject.inputX === null,
              subject.inputY === null,
              subject.outputX === null,
              subject.outputY === null,
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
              subject.inputY === null,
              subject.outputX.length === 0,
              subject.outputY === null,
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
        _.context('When there is no line item', () => {
          const number = 0;
          const subject = new Level({ number });

          subject.cycle();

          _.assert(
            'It cycles until `MAX_CYCLE_COUNT` is reached',
            () => subject.cycleCount === Level.MAX_CYCLE_COUNT,
          );
        });
      });

      _.method('#solve', () => {
        _.context('When not called', () => {
          const number = 0;
          const subject = new Level({ number });

          _.assert(
            'It has no `lineItem` in any of the Matrix elements',
            () => subject.matrix.getAll().map(element =>
              element.manager.lines.length === 0),
          );
        });

        _.context('When called', () => {
          const number = 0;
          const subject = new Level({ number });

          subject.solve();

          _.assert(
            'It has `lineItem` in all of the Matrix elements',
            () => subject.matrix.getAll().map(element =>
              element.manager.lines.length > 0),
          );
        });
      });
    });
  }
}
