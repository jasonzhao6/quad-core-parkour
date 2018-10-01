import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class MatrixTest {
  static enqueue(_) {
    _.Class(Matrix, () => {
      _.method('#constructor', () => {
        _.context('When creating a matrix', () => {
          const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
          const args = { rowCount, columnCount, Class };
          const subject = new _.DescribedClass(args);

          _.assert(
            'It initializes each property',
            () => [
              subject.rowCount === rowCount,
              subject.columnCount === columnCount,
              subject.Class === Class,
            ],
          );
        });

        _.context('When creating a 2x3 matrix', () => {
          const [rowCount, columnCount] = [2, 3];
          const args = { rowCount, columnCount };
          const subject = new _.DescribedClass(args).arrOfArr;

          _.assert(
            `It has ${rowCount} rows`,
            () => subject.length === rowCount,
          );

          _.assert(
            `Every row has ${columnCount} columns`,
            () => [
              !subject.includes(undefined),
              subject.every(row => row.length === columnCount),
            ],
          );
        });

        _.context('When creating a 2x2 Core matrix', () => {
          const [rowCount, columnCount] = [2, 2];
          const Class = Core;
          const args = { rowCount, columnCount, Class };
          const subject = new _.DescribedClass(args);

          _.assert(
            'It has `rowCount * columnCount` elements',
            () => subject.getAll().length === rowCount * columnCount,
          );

          _.assert(
            'Every element is an instance of Core',
            () => subject.getAll().every(el => el instanceof Class),
          );

          _.assert(
            'Every element is a unique instance',
            () => {
              const uniqueValues = [2, 1, -1, -2];
              const [_00, _01, _10, _11] = uniqueValues;

              subject.get(0, 0).accumulator = _00;
              subject.get(0, 1).accumulator = _01;
              subject.get(1, 0).accumulator = _10;
              subject.get(1, 1).accumulator = _11;

              const assignedValues = subject.getAll().map(el => el.accumulator);
              return assignedValues.join() === uniqueValues.join();
            },
          );

          _.assert(
            'Every element knows its position and parent matrix',
            () => [
              subject.get(0, 0).i === 0,
              subject.get(0, 0).j === 0,
              subject.get(0, 0).matrix === subject,

              subject.get(0, 1).i === 0,
              subject.get(0, 1).j === 1,
              subject.get(0, 1).matrix === subject,

              subject.get(1, 0).i === 1,
              subject.get(1, 0).j === 0,
              subject.get(1, 0).matrix === subject,

              subject.get(1, 1).i === 1,
              subject.get(1, 1).j === 1,
              subject.get(1, 1).matrix === subject,
            ],
          );
        });
      });

      _.method('#get', () => {
        const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
        const args = { rowCount, columnCount, Class };
        const subject = new _.DescribedClass(args);
        const [i, j] = [0, 1];

        _.assert(
          'It returns element at `i` and `j`',
          () => subject.get(i, j) === subject.arrOfArr[i][j],
        );
      });

      _.method('#getAll', () => {
        const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
        const args = { rowCount, columnCount, Class };
        const subject = new _.DescribedClass(args);

        _.assert(
          'It returns all the elements',
          () => [
            subject.getAll().length === 2,
            subject.getAll()[0] === subject.get(0, 0),
            subject.getAll()[1] === subject.get(0, 1),
          ],
        );
      });
    });
  }
}
