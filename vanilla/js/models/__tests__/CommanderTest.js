import Commander from '../Commander.js';
import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class CommanderTest {
  static enqueue(_) {
    _.Class('Commander', () => {
      _.method('#constructor', () => {
        _.context('When creating a commander', () => {
          const core = 'core';
          const subject = new Commander({ core });

          _.assert(
            'It initializes each property',
            () => subject.core === core,
          );
        });
      });

      _.method('#move, ', () => {
        const args = { rowCount: 2, columnCount: 2, Class: Core };
        const twoByTwo = new Matrix(args);
        const subject = twoByTwo.get(0, 0).commander;

        _.context('When moving value from one neighbor to another', () => {
          const message = 'message';
          twoByTwo.get(0, 1).send('left', message);

          _.assert(
            'It returns `true` after having moved the value',
            () => [
              subject.move('right', 'down') === true,
              twoByTwo.get(1, 0).receive('up') === message,
            ],
          );
        });
      });
    });
  }
}
