import Core from '../Core.js';

export default class CoreTest {
  static run(th) {
    th.Class(Core, () => {
      th.method('#constructor', () => {
        th.context('When creating a core without matrix params', () => {
          const subject = new th.DescribedClass();

          th.assert(
            'It initializes each matrix property to null',
            () => [
              subject.i === null,
              subject.j === null,
              subject.matrix === null,
            ],
          );
        });

        th.context('When creating a core with matrix params', () => {
          const [i, j, matrix] = [1, 2, {}];
          const subject = new th.DescribedClass({ i, j, matrix });

          th.assert(
            'It initializes each matrix property',
            () => [
              subject.i === i,
              subject.j === j,
              subject.matrix === matrix,
            ],
          );
        });

        th.context('When creating a core', () => {
          const subject = new th.DescribedClass();

          th.assert(
            'It initializes accumulator to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          th.assert(
            'It initializes backup to default value',
            () => subject.backup === Core.DEFAULT_VALUE,
          );
        });
      });
    });
  }
}
