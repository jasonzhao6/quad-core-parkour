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
  }
}
