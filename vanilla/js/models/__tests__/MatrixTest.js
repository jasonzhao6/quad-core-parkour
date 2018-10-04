import Core from '../Core.js';
import Matrix from '../Matrix.js';

export default class MatrixTest {
  static enqueue(_) {
    _.Class(Matrix, () => {
      _.method('#constructor', () => {
        _.context('When creating a matrix', () => {
          const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
          const args = { rowCount, columnCount, Class };
          const subject = new Matrix(args);

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
          const subject = new Matrix(args).arrOfArr;

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
          const subject = new Matrix(args);

          _.assert(
            'It has `rowCount * columnCount` elements',
            () => subject.getAll().length === rowCount * columnCount,
          );

          _.assert(
            'Every element is an instance of Core',
            () => subject.getAll().every(el => el instanceof Class),
          );

          _.assert(
            'Every element is a unique instance of Core',
            () => {
              const uniqueValues = [2, 1, -1, -2];
              const [oo, oi, io, ii] = uniqueValues;

              subject.get(0, 0).accumulator = oo;
              subject.get(0, 1).accumulator = oi;
              subject.get(1, 0).accumulator = io;
              subject.get(1, 1).accumulator = ii;

              const assignedValues = subject.getAll().map(el => el.accumulator);
              return assignedValues.join() === uniqueValues.join();
            },
          );

          _.assert(
            'Every element can find its neighboring elements via `director`',
            () => [
              subject.get(0, 0).director.up() === null,
              subject.get(0, 0).director.down() === subject.get(1, 0),
              subject.get(0, 0).director.left() === null,
              subject.get(0, 0).director.right() === subject.get(0, 1),

              subject.get(0, 1).director.up() === null,
              subject.get(0, 1).director.down() === subject.get(1, 1),
              subject.get(0, 1).director.left() === subject.get(0, 0),
              subject.get(0, 1).director.right() === null,

              subject.get(1, 0).director.up() === subject.get(0, 0),
              subject.get(1, 0).director.down() === null,
              subject.get(1, 0).director.left() === null,
              subject.get(1, 0).director.right() === subject.get(1, 1),

              subject.get(1, 1).director.up() === subject.get(0, 1),
              subject.get(1, 1).director.down() === null,
              subject.get(1, 1).director.left() === subject.get(1, 0),
              subject.get(1, 1).director.right() === null,
            ],
          );
        });
      });

      _.method('#alias', () => {
        const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
        const args = { rowCount, columnCount, Class };
        const subject = new Matrix(args);
        const [i, j, alias] = [0, 1, 'tail'];

        subject.alias(i, j, alias);

        _.assert(
          'It sets the `aliases` state',
          () => [
            subject.aliases[alias].i === i,
            subject.aliases[alias].j === j,
          ],
        );
      });

      _.method('#get', () => {
        const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
        const args = { rowCount, columnCount, Class };
        const subject = new Matrix(args);
        const [i, j, alias] = [0, 1, 'tail'];

        subject.alias(i, j, alias);

        _.context('When getting an element via `i` and `j`', () => {
          _.assert(
            'It returns element at `i` and `j`',
            () => subject.get(i, j) === subject.arrOfArr[i][j],
          );
        });

        _.context('When getting an element via `alias`', () => {
          _.assert(
            'It returns element at `i` and `j`',
            () => subject.get(alias) === subject.arrOfArr[i][j],
          );
        });
      });

      _.method('#getAll', () => {
        const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
        const args = { rowCount, columnCount, Class };
        const subject = new Matrix(args);

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
