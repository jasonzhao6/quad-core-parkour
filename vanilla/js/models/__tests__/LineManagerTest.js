import Core from '../Core.js';
import LineManager from '../LineManager.js';

export default class LineManagerTest {
  static enqueue(_) {
    _.Class('LineManager', () => {
      _.method('#constructor', () => {
        _.context('When creating a line manager', () => {
          const core = 'core';
          const sourceCode = 'sourceCode';
          const subject = new LineManager({ core, sourceCode });

          _.assert(
            'It initializes each property',
            () => subject.core === core,
            () => subject.sourceCode === sourceCode,
          );
        });
      });

      _.method('*lines', () => {
        const [line1, line2, line3] = ['line 1', 'line 2', 'line 3'];
        const sourceCode = [line1, line2, line3];
        const lineManager = new LineManager({ sourceCode });
        const subject = lineManager.lines();

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
  }
}
