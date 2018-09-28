import Core from '../Core.js';

export default class CoreTest {
  static run(__) {
    __.Class(Core, () => {
      __.method('#constructor', () => {
        __.context('When creating a core without matrix params', () => {
          const subject = new __.DescribedClass();

          __.assert(
            'It initializes each matrix property to null',
            () => [
              subject.i === null,
              subject.j === null,
              subject.matrix === null,
            ],
          );
        });

        __.context('When creating a core with matrix params', () => {
          const [i, j, matrix] = [1, 2, {}];
          const subject = new __.DescribedClass({ i, j, matrix });

          __.assert(
            'It initializes each matrix property',
            () => [
              subject.i === i,
              subject.j === j,
              subject.matrix === matrix,
            ],
          );
        });

        __.context('When creating a core', () => {
          const subject = new __.DescribedClass();

          __.assert(
            'It initializes accumulator to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          __.assert(
            'It initializes backup to default value',
            () => subject.backup === Core.DEFAULT_VALUE,
          );
        });
      });
    });
  }
}
