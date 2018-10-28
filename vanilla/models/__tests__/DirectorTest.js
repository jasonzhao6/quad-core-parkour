import Director from '../Director.js';
import Matrix from '../Matrix.js';

export default class DirectorTest {
  static enqueue(_) {
    _.Class('Director', () => {
      _.method('.isDirection', () => {
        _.assert(
          'It returns `true` for all directions',
          () => [
            Director.isDirection('up') === true,
            Director.isDirection('down') === true,
            Director.isDirection('left') === true,
            Director.isDirection('right') === true,
            Director.isDirection('above') === true,
            Director.isDirection('below') === true,
          ],
        );

        _.assert(
          'It returns `false` for non directions',
          () => [
            Director.isDirection('acc') === false,
            Director.isDirection('message') === false,
            Director.isDirection(0) === false,
            Director.isDirection(1) === false,
            Director.isDirection(-1) === false,
          ],
        );
      });

      _.method('.isStack', () => {
        _.assert(
          'It returns `true` for all directions',
          () => [
            Director.isStack('above') === true,
            Director.isStack('below') === true,
          ],
        );

        _.assert(
          'It returns `false` for non directions',
          () => [
            Director.isStack('acc') === false,
            Director.isStack('message') === false,
            Director.isStack(0) === false,
            Director.isStack(1) === false,
            Director.isStack(-1) === false,
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
            subject.escrow.toString() === matrix.escrow.toString(),
            subject.stackAbove.toString() === matrix.stackAbove.toString(),
            subject.stackBelow.toString() === matrix.stackBelow.toString(),
          ],
        );
      });

      _.method('#constructor, aliasing', () => {
        const args = { rowCount: 0, columnCount: 0, Class: {}.constructor };
        const matrixProxy = _.proxy(new Matrix(args));

        _.allow(matrixProxy).toReceive('alias');

        const [i, j, matrix] = [0, 0, matrixProxy];
        const subject = new Director({ i, j, matrix });
        const aliasArgs = [i, j, subject.name()];

        _.expect(matrixProxy).toHaveReceived('alias').withArgs(aliasArgs);

        _.assert(
          'It calls `matrix.alias()` with element name',
          () => matrixProxy.isAsExpected(),
        );
      });

      _.method('#name', () => {
        _.context('When called with direction to get name of stack', () => {
          const [i, j, matrix] = [0, 1, _.noop()];
          const subject = new Director({ i, j, matrix });

          _.assert(
            'It returns name of stack',
            () => [
              subject.name('above') === 'above',
              subject.name('below') === 'below',
            ],
          );
        });

        _.context('When called without argument to get name of self', () => {
          const [i, j, matrix] = [0, 1, _.noop()];
          const subject = new Director({ i, j, matrix });

          _.assert(
            'It returns name reflecting `i` and `j` of self',
            () => subject.name() === `${i}:${j}`,
          );
        });

        _.context('When called with direction to get name of neighbor', () => {
          const args = { rowCount: 2, columnCount: 2, Class: {}.constructor };
          const [i, j, matrix] = [0, 0, new Matrix(args)];
          const subject = new Director({ i, j, matrix });

          _.assert(
            'It returns name reflecting `i` and `j` of neighbor',
            () => subject.name('down') === `${i + 1}:${j}`,
          );
        });

        _.context('When called with direction that is out of bound', () => {
          const args = { rowCount: 2, columnCount: 2, Class: {}.constructor };
          const [i, j, matrix] = [0, 0, new Matrix(args)];
          const subject = new Director({ i, j, matrix });
          const direction = 'up';

          _.assert(
            'It returns the out of bound direction itself',
            () => subject.name(direction) === direction,
          );
        });
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
            () => subject.up === null,
          );
        });

        _.context('When element is at [1][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 1, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the element above',
            () => subject.up === twoByTwo.get(0, 0),
          );
        });
      });

      _.method('#down', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the element below',
            () => subject.down === twoByTwo.get(1, 0),
          );
        });

        _.context('When element is at [1][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 1, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.down === null,
          );
        });
      });

      _.method('#left', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.left === null,
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 1, matrix: twoByTwo });

          _.assert(
            'It returns the element to the left',
            () => subject.left === twoByTwo.get(0, 0),
          );
        });
      });

      _.method('#right', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the element to the right',
            () => subject.right === twoByTwo.get(0, 1),
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 1, matrix: twoByTwo });

          _.assert(
            'It returns null',
            () => subject.right === null,
          );
        });
      });

      _.method('#above', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the stack above',
            () => subject.above === twoByTwo.stackAbove,
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 1, matrix: twoByTwo });

          _.assert(
            'It returns the stack above',
            () => subject.above === twoByTwo.stackAbove,
          );
        });
      });

      _.method('#below', () => {
        _.context('When element is at [0][0] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 0, matrix: twoByTwo });

          _.assert(
            'It returns the stack below',
            () => subject.below === twoByTwo.stackBelow,
          );
        });

        _.context('When element is at [0][1] inside a 2x2 matrix', () => {
          const subject = new Director({ i: 0, j: 1, matrix: twoByTwo });

          _.assert(
            'It returns the stack below',
            () => subject.below === twoByTwo.stackBelow,
          );
        });
      });
    });

    _.Class('Director, messaging methods', () => {
      const message = 'message';
      const args = { rowCount: 2, columnCount: 2, Class: {}.constructor };
      const subject = new Director({ i: 0, j: 0, matrix: new Matrix(args) });
      subject.below.push(1);
      // ^ Tests in this block share one subject but use different directions.
      // #canSend tests sending up and down.
      // #canReceive tests receiving up and down.
      // #send tests sending left and right.
      // #receive tests receiving left and right.
      // Stack `above` stays empty throughout.
      // Stack `below` stays non-empty trhoughout.

      _.method('#canSend', () => {
        _.context('When sending to a stack', () => {
          _.assert(
            'It returns `true`',
            () => [
              subject.canSend('above') === true,
              subject.canSend('below') === true,
            ],
          );
        });

        _.context('When there is no existing message to recipient', () => {
          _.assert(
            'It returns `true`',
            () => subject.canSend('up') === true,
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
        _.context('When receiving from an empty test stack', () => {
          _.assert(
            'It returns `false`',
            () => subject.canReceive('above') === false,
          );
        });

        _.context('When receiving from a non-empty test stack', () => {
          _.assert(
            'It returns `true`',
            () => subject.canReceive('below') === true,
          );
        });

        _.context('When there is a message to receive', () => {
          const direction = 'up';
          subject.escrow.deposit(direction, subject.name(), message);

          _.assert(
            'It returns `true`',
            () => subject.canReceive(direction) === true,
          );
        });

        _.context('When there is no message to receive', () => {
          _.assert(
            'It returns `false`',
            () => subject.canReceive('down') === false,
          );
        });
      });

      _.method('#send', () => {
        const sender = subject.name();

        _.context('When sending message to the non-empty test stack', () => {
          const direction = 'below';
          subject.send(direction, message);

          _.assert(
            'It populates stack with message',
            () => subject.stackBelow.pop() === message,
          );
        });

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
          const recipient = subject[direction].director.name();
          subject.send(direction, message);

          _.assert(
            'It populates the escrow with the message',
            () => subject.escrow.withdraw(sender, recipient) === message,
          );
        });
      });

      _.method('#receive', () => {
        _.context('When receiving from the non-empty test stack', () => {
          const direction = 'below';
          subject.send(direction, message);

          _.assert(
            'It populates stack with message',
            () => subject.receive(direction) === message,
          );
        });

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
          const sender = subject[direction].director;
          sender.send('left', message);

          _.assert(
            'It receives the message',
            () => subject.receive(direction) === message,
          );
        });
      });
    });
  }
}
