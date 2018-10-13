import Core from '../Core.js';
import LineManager from '../LineManager.js';

export default class LineManagerTest {
  static enqueue(_) {
    _.Class('LineManager', () => {
      _.method('#constructor', () => {
        _.context('When creating a line manager', () => {
          const core = 'core';
          const subject = new LineManager({ core });

          _.assert(
            'It initializes each property',
            () => subject.core === core,
          );

          _.assert(
            'It initializes the `sourceCode` state to `[]`',
            () => [
              subject.sourceCode.length === 0,
              subject.sourceCode instanceof Array,
            ],
          );
        });
      });

      _.method('#load', () => {
        const sourceCode = 'sourceCode';
        const subject = new LineManager();

        subject.load(sourceCode);

        _.assert(
          'It sets the `sourceCode` state',
          () => subject.sourceCode === sourceCode,
        );
      });

      _.method('*lines', () => {
        _.context('When there is no `sourceCode`', () => {
          const lineManager = new LineManager();
          const subject = lineManager.lines();

          _.assert(
            'It iterates and returns undefined',
            () => [
              subject.next().value === undefined,
              subject.next().value === undefined,
            ],
          );
        });

        _.context('When there is `sourceCode`', () => {
          const lineManager = new LineManager();
          const subject = lineManager.lines();
          const [line1, line2, line3] = ['line 1', 'line 2', 'line 3'];
          lineManager.load([line1, line2, line3]);

          _.assert(
            'It iterates',
            () => [
              subject.next().value === line1,
              subject.next().value === line2,
              subject.next().value === line3,
            ],
          );

          _.assert(
            'It loops',
            () => [
              subject.next().value === line1,
              subject.next().value === line2,
              subject.next().value === line3,
              subject.next().value === line1,
              subject.next().value === line2,
              subject.next().value === line3,
            ],
          );

          _.assert(
            'It repeats',
            () => [
              subject.next().value === line1,
              subject.next(false).value === line1,
              subject.next().value === line2,
              subject.next(false).value === line2,
              subject.next().value === line3,
              subject.next(false).value === line3,
            ],
          );
        });
      });
    });
  }
}
