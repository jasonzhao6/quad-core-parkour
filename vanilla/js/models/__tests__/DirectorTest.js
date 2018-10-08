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
