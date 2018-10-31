import Core from '../Core.js';
import Escrow from '../Escrow.js';
import Matrix from '../Matrix.js';

export default class MatrixTest {
  static enqueue(_) {
    _.Class('Matrix', () => {
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
            ],
          );

          _.assert(
            'It initializes each state',
            () => [
              subject.aliases instanceof Object,
              subject.escrow instanceof Escrow,
              subject.arrOfArr instanceof Array,
              subject.stackAbove instanceof Array,
              subject.stackBelow instanceof Array,
            ],
          );
        });

        _.context('When creating a 10x20 matrix', () => {
          const [rowCount, columnCount] = [10, 20];
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
      });

      _.method('#constructor, Class prop', () => {
        _.context('When creating a 2x2 Core matrix', () => {
          const [rowCount, columnCount, Class] = [2, 2, Core];
          const subject = new Matrix({ rowCount, columnCount, Class });

          _.assert(
            'It has `rowCount * columnCount` elements',
            () => subject.getAll().length === rowCount * columnCount,
          );

          _.assert(
            'Every element is an instance of Core',
            () => subject.getAll().every(element => element instanceof Class),
          );

          _.assert(
            'Every element is a unique instance of Core',
            () => {
              const uniqueValues = [2, 1, -1, -2];
              const [aa, bb, cc, dd] = uniqueValues;

              subject.get(0, 0).accumulator = aa;
              subject.get(0, 1).accumulator = bb;
              subject.get(1, 0).accumulator = cc;
              subject.get(1, 1).accumulator = dd;

              const assignedValues = subject.getAll().map(el => el.accumulator);
              return assignedValues.join() === uniqueValues.join();
            },
          );
        });
      });

      _.method('#constructor, element-specific directors', () => {
        _.context('When creating a 2x2 Core matrix', () => {
          const [rowCount, columnCount, Class] = [2, 2, Core];
          const subject = new Matrix({ rowCount, columnCount, Class });

          _.assert(
            'Every element can find its neighbors via the `director`',
            () => [
              subject.get(0, 0).director.up === null,
              subject.get(0, 0).director.down === subject.get(1, 0),
              subject.get(0, 0).director.left === null,
              subject.get(0, 0).director.right === subject.get(0, 1),

              subject.get(0, 1).director.up === null,
              subject.get(0, 1).director.down === subject.get(1, 1),
              subject.get(0, 1).director.left === subject.get(0, 0),
              subject.get(0, 1).director.right === null,

              subject.get(1, 0).director.up === subject.get(0, 0),
              subject.get(1, 0).director.down === null,
              subject.get(1, 0).director.left === null,
              subject.get(1, 0).director.right === subject.get(1, 1),

              subject.get(1, 1).director.up === subject.get(0, 1),
              subject.get(1, 1).director.down === null,
              subject.get(1, 1).director.left === subject.get(1, 0),
              subject.get(1, 1).director.right === null,
            ],
          );

          _.assert(
            'Every element can talk to its neighbors via the `director`',
            () => [
              subject.get(0, 0).director.send('down', 'aa') &&
                subject.get(1, 0).director.receive('up') === 'aa',
              subject.get(0, 0).director.send('right', 'bb') &&
                subject.get(0, 1).director.receive('left') === 'bb',

              subject.get(0, 1).director.send('down', 'cc') &&
                subject.get(1, 1).director.receive('up') === 'cc',
              subject.get(0, 1).director.send('left', 'dd') &&
                subject.get(0, 0).director.receive('right') === 'dd',

              subject.get(1, 0).director.send('up', 'ee') &&
                subject.get(0, 0).director.receive('down') === 'ee',
              subject.get(1, 0).director.send('right', 'ff') &&
                subject.get(1, 1).director.receive('left') === 'ff',

              subject.get(1, 1).director.send('up', 'gg') &&
                subject.get(0, 1).director.receive('down') === 'gg',
              subject.get(1, 1).director.send('left', 'hh') &&
                subject.get(1, 0).director.receive('right') === 'hh',
            ],
          );
        });
      });

      _.method('#alias', () => {
        const [rowCount, columnCount, Class] = [1, 2, {}.constructor];
        const args = { rowCount, columnCount, Class };
        const subject = new Matrix(args);

        _.context('When giving [0][0] one alias', () => {
          const [i, j, alias] = [0, 0, 'head'];

          subject.alias(i, j, alias);

          _.assert(
            'It sets the `aliases` state',
            () => [
              subject.aliases[alias].i === i,
              subject.aliases[alias].j === j,
            ],
          );
        });

        _.context('When giving [0][1] two aliases', () => {
          const [i, j, alias1, alias2] = [0, 1, 'tail', 'rest'];

          subject.alias(i, j, alias1);
          subject.alias(i, j, alias2);

          _.assert(
            'It sets the `aliases` state',
            () => [
              subject.aliases[alias1].i === i,
              subject.aliases[alias1].j === j,
              subject.aliases[alias2].i === i,
              subject.aliases[alias2].j === j,
            ],
          );
        });
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
