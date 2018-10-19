import LineWorker from '../LineWorker.js';
import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class LineWorkerTest {
  static enqueue(_) {
    _.Class('LineWorker', () => {
      _.method('#constructor', () => {
        _.context('When creating a worker', () => {
          const core = 'core';
          const subject = new LineWorker({ core });

          _.assert(
            'It initializes each property',
            () => subject.core === core,
          );
        });
      });

      _.method('#add', () => {
        _.context('When adding string version of integer', () => {
          const core = new Core();
          const subject = new LineWorker({ core });
          const value = 10;

          _.assert(
            'It adds value to the `accumulator`',
            () => subject.add(value.toString()) === value,
          );
        });

        _.context('When adding integer to an `accumulator` of 0', () => {
          const core = new Core();
          const subject = new LineWorker({ core });
          const value = 10;

          _.assert(
            'It adds value to the `accumulator`',
            () => subject.add(value) === value,
          );
        });

        _.context('When adding integer to an `accumulator` of 5', () => {
          const core = new Core();
          const subject = new LineWorker({ core });
          const value = 10;
          subject.core.accumulator = 5;

          _.assert(
            'It adds value to the `accumulator`',
            () => subject.add(value) === (5 + value),
          );
        });

        _.context('When adding an `accumulator` of 5 to itself', () => {
          const core = new Core();
          const subject = new LineWorker({ core });
          subject.core.accumulator = 5;

          _.assert(
            'It doubles the value of the `accumulator`',
            () => subject.add('acc') === (5 * 2),
          );
        });

        _.context('When adding value from an empty neighbor', () => {
          const matrixArgs = { rowCount: 2, columnCount: 2, Class: Core };
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;

          _.assert(
            'It returns `REDO`',
            () => subject.add('up') === LineWorker.REDO,
          );
        });
      });

      _.method('#move', () => {
        const matrixArgs = { rowCount: 2, columnCount: 2, Class: Core };

        _.context('When moving message from one neighbor to another', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const message = 10;
          twoByTwo.get(0, 1).send('left', message);

          _.assert(
            'It returns `true` and recipient can receive the message',
            () => [
              subject.move('right', 'down') === true,
              twoByTwo.get(1, 0).receive('up') === message,
            ],
          );
        });

        _.context('When moving message from an empty neighbor', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;

          _.assert(
            'It returns `REDO` and recipient cannot receive the message',
            () => [
              subject.move('right', 'down') === LineWorker.REDO,
              twoByTwo.get(1, 0).receive('up') === null,
            ],
          );
        });

        _.context('When moving message to an already occupied neighbor', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const existingMessage = 10;
          subject.core.send('down', existingMessage);

          const newMessage = 20;
          twoByTwo.get(0, 1).send('left', newMessage);

          _.assert(
            'It returns `REDO` and recipient receives the existing message',
            () => [
              subject.move('right', 'down') === LineWorker.REDO,
              twoByTwo.get(1, 0).receive('up') === existingMessage,
            ],
          );
        });

        _.context('When moving message from accumulator to neighbor', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const message = 10;
          subject.core.accumulator = message;

          _.assert(
            'It returns `true` and recipient can receive the message',
            () => [
              subject.move('acc', 'down') === true,
              twoByTwo.get(1, 0).receive('up') === message,
            ],
          );
        });

        _.context('When moving message from neighbor to accumulator', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const message = 10;
          twoByTwo.get(1, 0).send('up', message);

          _.assert(
            'It returns `true` and the message is in the accumulator',
            () => [
              subject.move('down', 'acc') === true,
              subject.core.accumulator === message,
            ],
          );
        });

        _.context('When moving message directly to neighbor', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const message = 10;

          _.assert(
            'It returns `true` and recipient can receive the message',
            () => [
              subject.move(message, 'down') === true,
              twoByTwo.get(1, 0).receive('up') === message,
            ],
          );
        });

        _.context('When moving message directly to accumulator', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const message = 10;

          _.assert(
            'It returns `true` and recipient can receive the message',
            () => [
              subject.move(message, 'acc') === true,
              subject.core.accumulator === message,
            ],
          );
        });

        _.context('When moving message to an invalid destination', () => {
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;
          const message = 10;

          _.assert(
            'It returns `false`',
            () => subject.move(message, 'yo') === false,
          );
        });
      });
    });
  }
}
