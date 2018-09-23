import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class MatrixTest {
  static run(th) {
    th.Class(Matrix, () => {
      th.method('#constructor', () => {
        th.context('When creating a 2x3 matrix', () => {
          const [rowCount, columnCount] = [2, 3];
          const subject = new Matrix({ rowCount, columnCount }).arrOfArr;

          th.assert(
            `It has ${rowCount} rows`,
            () => subject.length === rowCount,
          );

          th.assert(
            `Every row has ${columnCount} columns`,
            () => !subject.includes(undefined) &&
              subject.every(row => row.length === columnCount),
          );
        });

        th.context('When creating a Core matrix', () => {
          const [rowCount, columnCount] = [2, 2];
          const Class = Core;
          const subject = new Matrix({ rowCount, columnCount, Class }).arrOfArr;

          th.assert(
            'It has `rowCount * columnCount` elements',
            () => subject.flat().length === rowCount * columnCount,
          );

          th.assert(
            'Every element is an instance of Core',
            () => subject.flat().every(el => el instanceof Core),
          );

          th.assert(
            'Elements are unique',
            () => {
              subject[0][0].accumulator = 999;
              subject[1][1].accumulator = -999;
              const values = subject.flat().map(el => el.accumulator);
              const uniques = new Set(values);
              return uniques.size === 3;
            },
          );
        });
      });
    });
  }
}
