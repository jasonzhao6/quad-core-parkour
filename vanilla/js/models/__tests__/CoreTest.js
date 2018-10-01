import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class CoreTest {
  static enqueue(_) {
    _.Class(Core, () => {
      _.method('#constructor', () => {
        _.context('When creating a core without matrix args', () => {
          const subject = new Core();

          _.assert(
            'It initializes each matrix property to null',
            () => [
              subject.i === null,
              subject.j === null,
              subject.matrix === null,
            ],
          );
        });

        _.context('When creating a core with matrix args', () => {
          const [i, j, matrix] = [1, 2, {}];
          const subject = new Core({ i, j, matrix });

          _.assert(
            'It initializes each matrix property',
            () => [
              subject.i === i,
              subject.j === j,
              subject.matrix === matrix,
            ],
          );
        });

        _.context('When creating a core', () => {
          const subject = new Core();

          _.assert(
            'It initializes each `ins` state to null',
            () => [
              subject.ins.up === null,
              subject.ins.down === null,
              subject.ins.left === null,
              subject.ins.down === null,
            ],
          );

          _.assert(
            'It initializes `accumulator` state to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          _.assert(
            'It initializes `backup` state to default value',
            () => subject.backup === Core.DEFAULT_VALUE,
          );
        });
      });

      const twoByTwo = new Matrix({ rowCount: 2, columnCount: 2, Class: Core });

      _.method('#up', () => {
        _.context('When core is at [0][0] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(0, 0);

          _.assert(
            'It returns null',
            () => subject.up() === null,
          );
        });

        _.context('When core is at [1][0] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(1, 0);

          _.assert(
            'It returns core above',
            () => subject.up() === twoByTwo.get(0, 0),
          );
        });
      });

      _.method('#down', () => {
        _.context('When core is at [0][0] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(0, 0);

          _.assert(
            'It returns core below',
            () => subject.down() === twoByTwo.get(1, 0),
          );
        });

        _.context('When core is at [1][0] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(1, 0);

          _.assert(
            'It returns null',
            () => subject.down() === null,
          );
        });
      });

      _.method('#left', () => {
        _.context('When core is at [0][0] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(0, 0);

          _.assert(
            'It returns null',
            () => subject.left() === null,
          );
        });

        _.context('When core is at [0][1] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(0, 1);

          _.assert(
            'It returns core to the left',
            () => subject.left() === twoByTwo.get(0, 0),
          );
        });
      });

      _.method('#right', () => {
        _.context('When core is at [0][0] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(0, 0);

          _.assert(
            'It returns core to the right',
            () => subject.right() === twoByTwo.get(0, 1),
          );
        });

        _.context('When core is at [0][1] inside a 2x2 matrix', () => {
          const subject = twoByTwo.get(0, 1);

          _.assert(
            'It returns null',
            () => subject.right() === null,
          );
        });
      });

      _.method('#move', () => {
        _.context('When moving a value from up to down', () => {
          const subject = twoByTwo.get(0, 0);
          const value = 10;

          subject.ins.up = value;
          subject.move('up', 'down');

          _.assert(
            'It sets up to null',
            () => subject.ins.up === null,
          );

          _.assert(
            'It sets down to the correct value',
            () => subject.down().ins.up === value,
          );
        });

        _.context('When moving a value from up to right', () => {
          const subject = twoByTwo.get(0, 0);
          const value = 10;

          subject.ins.up = value;
          subject.move('up', 'right');

          _.assert(
            'It sets up to null',
            () => subject.ins.up === null,
          );

          _.assert(
            'It sets right to the correct value',
            () => subject.right().ins.left === value,
          );
        });
      });
    });
  }
}
