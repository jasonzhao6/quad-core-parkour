import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class CoreTest {
  static enqueue(_) {
    _.Class(Core, () => {
      _.method('#constructor', () => {
        _.context('When creating a core', () => {
          const director = 'director';
          const subject = new Core(director);

          _.assert(
            'It initializes the `director` prop',
            () => subject.director === director,
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

      _.method('#move', () => {
        _.context('When moving a value from up to down', () => {
          const subject = twoByTwo.get(0, 0);
          const value = 10;

          // subject.ins.up = value;
          // subject.move('up', 'down');

          _.xassert(
            'It sets up to null',
            () => subject.ins.up === null,
          );

          _.xassert(
            'It sets down to the correct value',
            () => subject.down().ins.up === value,
          );
        });

        _.context('When moving a value from up to right', () => {
          const subject = twoByTwo.get(0, 0);
          const value = 10;

          // subject.ins.up = value;
          subject.move('up', 'right');

          _.xassert(
            'It sets up to null',
            () => subject.ins.up === null,
          );

          _.xassert(
            'It sets right to the correct value',
            () => subject.right().ins.left === value,
          );
        });
      });
    });
  }
}
