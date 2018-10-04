/* eslint object-curly-newline:
      ['error', { consistent: true, minProperties: 5 }] */

import Director from '../Director.js';

export default class DirectorTest {
  static enqueue(_) {
    _.Class(Director, () => {
      _.method('.reverse', () => {
        const { UP, DOWN, LEFT, RIGHT } = Director.DIRECTIONS;

        _.assert(
          'It reverses any given direction',
          () => [
            Director.reverse(UP) === DOWN,
            Director.reverse(DOWN) === UP,
            Director.reverse(LEFT) === RIGHT,
            Director.reverse(RIGHT) === LEFT,
          ],
        );
      });
    });
  }
}
