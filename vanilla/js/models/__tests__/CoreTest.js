import Core from '../Core.js';

export default class CoreTest {
  static run(_) {
    _.Class(Core, () => {
      _.method('#constructor', () => {
        _.context('When creating a core without matrix params', () => {
          const subject = new _.DescribedClass();

          _.assert(
            'It initializes each matrix property to null',
            () => [
              subject.i === null,
              subject.j === null,
              subject.matrix === null,
            ],
          );
        });

        _.context('When creating a core with matrix params', () => {
          const [i, j, matrix] = [1, 2, {}];
          const subject = new _.DescribedClass({ i, j, matrix });

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
          const subject = new _.DescribedClass();

          _.assert(
            'It initializes accumulator to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          _.assert(
            'It initializes backup to default value',
            () => subject.backup === Core.DEFAULT_VALUE,
          );
        });
      });
    });
  }
}
