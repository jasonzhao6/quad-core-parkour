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

      _.method('#add', () => {
        _.context('When adding string version of integer', () => {
          const core = new Core();
          const subject = core.worker;
          const value = 10;

          _.assert(
            'It adds value to the `accumulator`',
            () => subject.add(value.toString()) === value,
          );
        });

        _.context('When adding integer to an `accumulator` of 0', () => {
          const core = new Core();
          const subject = core.worker;
          const value = 10;

          _.assert(
            'It adds value to the `accumulator`',
            () => subject.add(value) === value,
          );
        });

        _.context('When adding integer to an `accumulator` of 5', () => {
          const core = new Core();
          const subject = core.worker;
          const value = 10;
          subject.core.accumulator = 5;

          _.assert(
            'It adds value to the `accumulator`',
            () => subject.add(value) === (5 + value),
          );
        });

        _.context('When adding an `accumulator` of 5 to itself', () => {
          const core = new Core();
          const subject = core.worker;
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

      _.method('#subtract', () => {
        _.context('When subtracting string version of integer', () => {
          const core = new Core();
          const subject = core.worker;
          const value = 10;

          _.assert(
            'It subtracts value to the `accumulator`',
            () => subject.subtract(value.toString()) === -value,
          );
        });

        _.context('When subtracting integer to an `accumulator` of 0', () => {
          const core = new Core();
          const subject = core.worker;
          const value = 10;

          _.assert(
            'It subtracts value to the `accumulator`',
            () => subject.subtract(value) === -value,
          );
        });

        _.context('When subtracting integer to an `accumulator` of 5', () => {
          const core = new Core();
          const subject = core.worker;
          const value = 10;
          subject.core.accumulator = 5;

          _.assert(
            'It subtracts value to the `accumulator`',
            () => subject.subtract(value) === (5 - value),
          );
        });

        _.context('When subtracting an `accumulator` of 5 to itself', () => {
          const core = new Core();
          const subject = core.worker;
          subject.core.accumulator = 5;

          _.assert(
            'It doubles the value of the `accumulator`',
            () => subject.subtract('acc') === 0,
          );
        });

        _.context('When subtracting value from an empty neighbor', () => {
          const matrixArgs = { rowCount: 2, columnCount: 2, Class: Core };
          const twoByTwo = new Matrix(matrixArgs);
          const subject = twoByTwo.get(0, 0).worker;

          _.assert(
            'It returns `REDO`',
            () => subject.subtract('up') === LineWorker.REDO,
          );
        });
      });

      _.method('#jump', () => {
        const coreProxy = _.proxy(new Core());
        const subject = new LineWorker({ core: coreProxy });
        const label = 'label';

        _.allow(coreProxy).toReceive('gotoLabel');
        subject.jump(label);
        _.expect(coreProxy).toHaveReceived('gotoLabel').withArgs(label);

        _.assert(
          'It subtracts value to the `accumulator`',
          () => coreProxy.isAsExpected(),
        );
      });

      _.method('#jumpIfZero', () => {
        _.context('When accumulator is 0', () => {
          const coreProxy = _.proxy(new Core());
          const subject = new LineWorker({ core: coreProxy });
          const label = 'label';

          _.allow(coreProxy).toReceive('gotoLabel');
          subject.jumpIfZero(label);
          _.expect(coreProxy).toHaveReceived('gotoLabel').withArgs(label);

          _.assert(
            'It subtracts value to the `accumulator`',
            () => coreProxy.isAsExpected(),
          );
        });

        _.context('When accumulator is positive', () => {
          const coreProxy = _.proxy(new Core());
          const subject = new LineWorker({ core: coreProxy });
          const label = 'label';

          _.allow(coreProxy).toReceive('gotoLabel');
          coreProxy.accumulator = 1;
          subject.jumpIfZero(label);
          _.expect(coreProxy).toHaveReceived('gotoLabel').nTimes(0);

          _.assert(
            'It subtracts value to the `accumulator`',
            () => coreProxy.isAsExpected(),
          );
        });

        _.context('When accumulator is negative', () => {
          const coreProxy = _.proxy(new Core());
          const subject = new LineWorker({ core: coreProxy });
          const label = 'label';

          _.allow(coreProxy).toReceive('gotoLabel');
          coreProxy.accumulator = -1;
          subject.jumpIfZero(label);
          _.expect(coreProxy).toHaveReceived('gotoLabel').nTimes(0);

          _.assert(
            'It subtracts value to the `accumulator`',
            () => coreProxy.isAsExpected(),
          );
        });
      });

      _.method('#jumpIfPositive', () => {
        _.context('When accumulator is 0', () => {
          const coreProxy = _.proxy(new Core());
          const subject = new LineWorker({ core: coreProxy });
          const label = 'label';

          _.allow(coreProxy).toReceive('gotoLabel');
          subject.jumpIfPositive(label);
          _.expect(coreProxy).toHaveReceived('gotoLabel').nTimes(0);

          _.assert(
            'It subtracts value to the `accumulator`',
            () => coreProxy.isAsExpected(),
          );
        });

        _.context('When accumulator is positive', () => {
          const coreProxy = _.proxy(new Core());
          const subject = new LineWorker({ core: coreProxy });
          const label = 'label';

          _.allow(coreProxy).toReceive('gotoLabel');
          coreProxy.accumulator = 1;
          subject.jumpIfPositive(label);
          _.expect(coreProxy).toHaveReceived('gotoLabel').withArgs(label);

          _.assert(
            'It subtracts value to the `accumulator`',
            () => coreProxy.isAsExpected(),
          );
        });

        _.context('When accumulator is negative', () => {
          const coreProxy = _.proxy(new Core());
          const subject = new LineWorker({ core: coreProxy });
          const label = 'label';

          _.allow(coreProxy).toReceive('gotoLabel');
          coreProxy.accumulator = -1;
          subject.jumpIfPositive(label);
          _.expect(coreProxy).toHaveReceived('gotoLabel').nTimes(0);

          _.assert(
            'It subtracts value to the `accumulator`',
            () => coreProxy.isAsExpected(),
          );
        });
      });

      _.method('#save', () => {
        const core = new Core();
        const subject = core.worker;
        const value = 5;
        subject.core.accumulator = value;

        subject.save();

        _.assert(
          'It sets both `accumulator` and `backup` to `value`',
          () => [
            subject.core.accumulator === value,
            subject.core.backup === value,
          ],
        );
      });

      _.method('#swap', () => {
        const core = new Core();
        const subject = core.worker;
        const accumulator = 5;
        const backup = 10;
        subject.core.accumulator = accumulator;
        subject.core.backup = backup;

        subject.swap();

        _.assert(
          'It swaps `accumulator` and `backup` values',
          () => [
            subject.core.accumulator === backup,
            subject.core.backup === accumulator,
          ],
        );
      });
    });
  }
}
