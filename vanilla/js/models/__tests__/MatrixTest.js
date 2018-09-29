import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class MatrixTest {
  static run(_) {
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
          const subject = new _.DescribedClass(args).arrOfArr;

          _.assert(
            'It has `rowCount * columnCount` elements',
            () => subject.flat().length === rowCount * columnCount,
          );

          _.assert(
            'Every element is an instance of Core',
            () => subject.flat().every(el => el instanceof Core),
          );

          _.assert(
            'Every element is a unique instance',
            () => {
              const valuesBefore = subject.flat().map(el => el.accumulator);

              const [_00, _01, _10, _11] = [2, 1, -1, -2];
              subject[0][0].accumulator = _00;
              subject[0][1].accumulator = _01;
              subject[1][0].accumulator = _10;
              subject[1][1].accumulator = _11;
              const valuesAfter = subject.flat().map(el => el.accumulator);

              return [
                valuesBefore.every(value => value === Core.DEFAULT_VALUE),

                valuesAfter[0] === _00,
                valuesAfter[1] === _01,
                valuesAfter[2] === _10,
                valuesAfter[3] === _11,
              ];
            },
          );

          _.assert(
            'Every element knows its position and parent matrix',
            () => [
              subject[0][0].i === 0,
              subject[0][0].j === 0,
              subject[0][0].matrix.arrOfArr === subject,

              subject[0][1].i === 0,
              subject[0][1].j === 1,
              subject[0][1].matrix.arrOfArr === subject,

              subject[1][0].i === 1,
              subject[1][0].j === 0,
              subject[1][0].matrix.arrOfArr === subject,

              subject[1][1].i === 1,
              subject[1][1].j === 1,
              subject[1][1].matrix.arrOfArr === subject,
            ],
          );
        });
      });
    });
  }
}
