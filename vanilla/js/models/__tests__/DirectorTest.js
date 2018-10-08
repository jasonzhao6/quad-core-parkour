/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

import Director from '../Director.js';
import Matrix from '../Matrix.js';

export default class DirectorTest {
  static enqueue(_) {
    _.Class('Director', () => {
      _.method('.reverse', () => {
        _.assert(
          'It reverses any given direction',
          () => [
            Director.reverse('up') === 'down',
            Director.reverse('down') === 'up',
            Director.reverse('left') === 'right',
            Director.reverse('right') === 'left',
          ],
        );
      });

      _.method('#constructor', () => {
        const [i, j, matrix] = [0, 0, _.noop()];
        const subject = new Director({ i, j, matrix });

        _.assert(
          'It initializes each property',
          () => [
            subject.i === i,
            subject.j === j,
            subject.matrix === matrix,
          ],
        );
      });

      _.method('#constructor, naming', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const args = { rowCount: 0, columnCount: 0, Class: {}.constructor };
          const matrixProxy = _.proxy(new Matrix(args));

          _.allow(matrixProxy).toReceive('alias');

          const [i, j, matrix] = [0, 0, matrixProxy];
          new Director({ i, j, matrix }); // eslint-disable-line no-new

          _.expect(matrixProxy).toHaveReceived('alias').withArgs([i, j, 'oo']);

          _.assert(
            'It calls `matrix.alias()` with element name',
            () => matrixProxy.isAsExpected(),
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const args = { rowCount: 0, columnCount: 0, Class: {}.constructor };
          const matrixProxy = _.proxy(new Matrix(args));

          _.allow(matrixProxy).toReceive('alias');

          const [i, j, matrix] = [0, 1, matrixProxy];
          new Director({ i, j, matrix }); // eslint-disable-line no-new

          _.expect(matrixProxy).toHaveReceived('alias').withArgs([i, j, 'oi']);

          _.assert(
            'It calls `matrix.alias()` with element name',
            () => matrixProxy.isAsExpected(),
          );
        });

        _.context('When element is at [1][0] inside a 2x2 matrix', () => {
          const args = { rowCount: 0, columnCount: 0, Class: {}.constructor };
          const matrixProxy = _.proxy(new Matrix(args));

          _.allow(matrixProxy).toReceive('alias');

          const [i, j, matrix] = [1, 0, matrixProxy];
          new Director({ i, j, matrix }); // eslint-disable-line no-new

          _.expect(matrixProxy).toHaveReceived('alias').withArgs([i, j, 'io']);

          _.assert(
            'It calls `matrix.alias()` with element name',
            () => matrixProxy.isAsExpected(),
          );
        });

        _.context('When element is at [1][1] inside a 2x2 matrix', () => {
          const args = { rowCount: 0, columnCount: 0, Class: {}.constructor };
          const matrixProxy = _.proxy(new Matrix(args));

          _.allow(matrixProxy).toReceive('alias');

          const [i, j, matrix] = [1, 1, matrixProxy];
          new Director({ i, j, matrix }); // eslint-disable-line no-new

          _.expect(matrixProxy).toHaveReceived('alias').withArgs([i, j, 'ii']);

          _.assert(
            'It calls `matrix.alias()` with element name',
            () => matrixProxy.isAsExpected(),
          );
        });
      });

      _.method('#escrow', () => {
        const [i, j, matrix] = [0, 0, _.noop()];
        const subject = new Director({ i, j, matrix });

        _.assert(
          'It delegates to the `matrix` property',
          () => subject.escrow.toString() === subject.matrix.escrow.toString(),
        );
      });
    });

    _.Class('Director, direction methods', () => {
      const args = { rowCount: 2, columnCount: 2, Class: {}.constructor };
      const twoByTwo = new Matrix(args);

      _.method('#up', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.up() === null,
          );
        });

        _.context('When element is at [1][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 1, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the element above',
            () => subject.up() === twoByTwo.get(0, 0),
          );
        });
      });

      _.method('#down', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the element below',
            () => subject.down() === twoByTwo.get(1, 0),
          );
        });

        _.context('When element is at [1][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 1, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.down() === null,
          );
        });
      });

      _.method('#left', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.left() === null,
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 1, matrix: twoByTwo });

          _.assert(
            'It returns the element to the left',
            () => subject.left() === twoByTwo.get(0, 0),
          );
        });
      });

      _.method('#right', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the element to the right',
            () => subject.right() === twoByTwo.get(0, 1),
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 1, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.right() === null,
          );
        });
      });
    });

    _.Class('Director, messaging methods', () => {
      const message = 'message';
      const args = { rowCount: 2, columnCount: 2, Class: {}.constructor };
      const subject = new Director({ i: 0, j: 0, matrix: new Matrix(args) });
      // ^ Tests in this block share this subject but uses different directions.
      // #canSend tests sending up and down.
      // #canReceive tests receiving up and down.
      // #send tests sending left and right.
      // #receive tests receiving left and right.

      _.method('#canSend', () => {
        _.context('When there is no existing message to recipient', () => {
          const direction = 'up';

          _.assert(
            'It returns `true`',
            () => subject.canSend(direction) === true,
          );
        });

        _.context('When there is already a message to recipient', () => {
          const direction = 'down';
          subject.send(direction, message);

          _.assert(
            'It returns `false`',
            () => subject.canSend(direction) === false,
          );
        });
      });

      _.method('#canReceive', () => {
        _.context('When there is a message to receive', () => {
          const direction = 'up';
          subject.escrow.deposit(direction, subject.name(), message);

          _.assert(
            'It returns `true`',
            () => subject.canReceive(direction) === true,
          );
        });

        _.context('When there is no message to receive', () => {
          const direction = 'down';

          _.assert(
            'It returns `false`',
            () => subject.canReceive(direction) === false,
          );
        });
      });

      _.method('#send', () => {
        const sender = subject.name();

        _.context('When sending message to out of bound', () => {
          const direction = 'left';
          subject.send(direction, message);

          _.assert(
            'It populates the escrow with direction as the recipient name',
            () => subject.escrow.withdraw(sender, direction) === message,
          );
        });

        _.context('When sending a message to another element', () => {
          const direction = 'right';
          const recipient = subject[direction]().director.name();
          subject.send(direction, message);

          _.assert(
            'It populates the escrow with the message',
            () => subject.escrow.withdraw(sender, recipient) === message,
          );
        });
      });

      _.method('#receive', () => {
        _.context('When receiving message from out of bound', () => {
          const direction = 'left';
          subject.escrow.deposit(direction, subject.name(), message);

          _.assert(
            'It receives the message',
            () => subject.receive(direction) === message,
          );
        });

        _.context('When receiving message from another element', () => {
          const direction = 'right';
          const sender = subject[direction]().director;
          sender.send(Director.reverse(direction), message);

          _.assert(
            'It receives the message',
            () => subject.receive(direction) === message,
          );
        });
      });
    });
  }
}
