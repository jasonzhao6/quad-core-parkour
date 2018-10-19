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
              subject.nextLine() === undefined,
              subject.nextLine() === undefined,
            ],
          );
        });

        _.context('When there are `lines`', () => {
          const subject = new LineManager();
          const [line1, line2, line3] = ['line 1', 'line 2', 'line 3'];
          subject.loadLines([line1, line2, line3]);

          _.assert(
            'It iterates',
            () => [
              subject.nextLine() === line1,
              subject.nextLine() === line2,
              subject.nextLine() === line3,
            ],
          );

          _.assert(
            'It loops',
            () => [
              subject.nextLine() === line1,
              subject.nextLine() === line2,
              subject.nextLine() === line3,
              subject.nextLine() === line1,
              subject.nextLine() === line2,
              subject.nextLine() === line3,
            ],
          );

          _.assert(
            'It supports repeating the previous value',
            () => [
              subject.nextLine() === line1,
              subject.nextLine(true) === line1,
              subject.nextLine() === line2,
              subject.nextLine(true) === line2,
              subject.nextLine() === line3,
              subject.nextLine(true) === line3,
            ],
          );
        });

        _.context('When there is a `core`', () => {
          const core = 'core';
          const managerProxy = _.proxy(new LineManager({ core }));

          _.allow(managerProxy).toReceive('executeLine');

          managerProxy.nextLine();

          _.expect(managerProxy).toHaveReceived('executeLine');

          _.assert(
            'It executes the line',
            () => managerProxy.isAsExpected(),
          );
        });
      });

      _.method('nextLine, execution', () => {
        _.context('When adding', () => {
          const subject = new LineManager({ core: _.echo() });
          subject.loadLines(['add 10']);

          _.assert(
            'It executes the line',
            () => subject.nextLine() === 'add,10',
          );
        });

        _.context('When moving', () => {
          const subject = new LineManager({ core: _.echo() });
          subject.loadLines(['mov up down']);

          _.assert(
            'It executes the line',
            () => subject.nextLine() === 'move,up,down',
          );
        });
      });
    });
  }
}
