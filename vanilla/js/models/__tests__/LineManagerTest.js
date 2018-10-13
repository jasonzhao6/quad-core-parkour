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
            'It initializes the `lineItems` state to `[]`',
            () => [
              subject.lineItems.length === 0,
              subject.lineItems instanceof Array,
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

      _.method('#load', () => {
        const lineItems = 'lineItems';
        const subject = new LineManager();

        subject.load(lineItems);

        _.assert(
          'It sets the `lineItems` state',
          () => subject.lineItems === lineItems,
        );
      });

      _.method('next', () => {
        _.context('When there is no `lineItems`', () => {
          const subject = new LineManager();

          _.assert(
            'It iterates and returns undefined',
            () => [
              subject.next().value === undefined,
              subject.next().value === undefined,
            ],
          );
        });

        _.context('When there is `lineItems`', () => {
          const subject = new LineManager();
          const [line1, line2, line3] = ['line 1', 'line 2', 'line 3'];
          subject.load([line1, line2, line3]);

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
            'It supports repeating the previous value',
            () => [
              subject.next().value === line1,
              subject.next({ repeatPrevious: true }).value === line1,
              subject.next().value === line2,
              subject.next({ repeatPrevious: true }).value === line2,
              subject.next().value === line3,
              subject.next({ repeatPrevious: true }).value === line3,
            ],
          );
        });
      });
    });
  }
}
