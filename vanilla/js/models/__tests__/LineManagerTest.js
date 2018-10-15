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
            'It initializes the `lines` state to `[]`',
            () => [
              subject.lines.length === 0,
              subject.lines instanceof Array,
            ],
          );

          _.assert(
            'It initializes the `priorities` state to a generator',
            () => [
              subject.priorities.next().value === undefined,
              subject.priorities.next().done === false,
            ],
          );
        });
      });

      _.method('#loadLines', () => {
        const lines = 'lines';
        const subject = new LineManager();

        subject.loadLines(lines);

        _.assert(
          'It sets the `lines` state',
          () => subject.lines === lines,
        );
      });

      _.method('nextLine', () => {
        _.context('When there is no `lines`', () => {
          const subject = new LineManager();

          _.assert(
            'It iterates and returns undefined',
            () => [
              subject.nextLine().value === undefined,
              subject.nextLine().value === undefined,
            ],
          );
        });

        _.context('When there is `lines`', () => {
          const subject = new LineManager();
          const [line1, line2, line3] = ['line 1', 'line 2', 'line 3'];
          subject.loadLines([line1, line2, line3]);

          _.assert(
            'It iterates',
            () => [
              subject.nextLine().value === line1,
              subject.nextLine().value === line2,
              subject.nextLine().value === line3,
            ],
          );

          _.assert(
            'It loops',
            () => [
              subject.nextLine().value === line1,
              subject.nextLine().value === line2,
              subject.nextLine().value === line3,
              subject.nextLine().value === line1,
              subject.nextLine().value === line2,
              subject.nextLine().value === line3,
            ],
          );

          _.assert(
            'It supports repeating the previous value',
            () => [
              subject.nextLine().value === line1,
              subject.nextLine(true).value === line1,
              subject.nextLine().value === line2,
              subject.nextLine(true).value === line2,
              subject.nextLine().value === line3,
              subject.nextLine(true).value === line3,
            ],
          );
        });
      });
    });
  }
}
