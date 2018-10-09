import TestCasePrinter from '../__TestCasePrinter__.js';

export default class TestCasePrinterTest {
  static enqueue(_) {
    _.Class('TestCasePrinter', () => {
      _.method('#constructor', () => {
        _.context('When creating a printer with `failures` arg', () => {
          const failures = [];
          const subject = new TestCasePrinter(failures);

          _.assert(
            'It initializes the `failures` property',
            () => subject.failures === failures,
          );
        });

        _.context('When creating a printer without console override', () => {
          const subject = new TestCasePrinter();

          _.assert(
            'It initializes the `console` property',
            () => subject.console === console,
          );
        });

        _.context('When creating a printer with console override', () => {
          const consoleOverride = {};
          const subject = new TestCasePrinter([], consoleOverride);

          _.assert(
            'It initializes the `console` property with override',
            () => subject.console === consoleOverride,
          );
        });

        const subject = new TestCasePrinter();

        _.assert(
          'It initializes each `last*` property to null',
          () => [
            subject.lastClass === null,
            subject.lastMethod === null,
            subject.lastContext === null,
          ],
        );
      });

      _.method('#print', () => {
        const subject = new TestCasePrinter([], _.noop());

        subject.print();

        _.assert(
          'It resets all the `last*` states when done',
          () => [
            subject.lastClass === null,
            subject.lastMethod === null,
            subject.lastContext === null,
          ],
        );

        const newConsoleProxy = () => {
          const consoleProxy = _.proxy(console);

          _.allow(consoleProxy).toReceive('group').andReturn();
          _.allow(consoleProxy).toReceive('groupEnd').andReturn();
          _.allow(consoleProxy).toReceive('info').andReturn();

          return consoleProxy;
        };

        _.context('When there is 1 failure', () => {
          const failures = [[1, 2, 3, 4]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(3);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(3);
          _.expect(consoleProxy).toHaveReceived('info');

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there is 1 failure without context', () => {
          const failures = [[1, 2, null, 4]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(2);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(2);
          _.expect(consoleProxy).toHaveReceived('info');

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there is 1 failure without method', () => {
          const failures = [[1, null, 3, 4]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(2);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(2);
          _.expect(consoleProxy).toHaveReceived('info');

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there is 1 failure without context nor method', () => {
          const failures = [[1, null, null, 4]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group');
          _.expect(consoleProxy).toHaveReceived('groupEnd');
          _.expect(consoleProxy).toHaveReceived('info');

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there are 2 failures without context', () => {
          const failures = [[1, 2, null, 40], [1, 2, null, 41]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(2);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(2);
          _.expect(consoleProxy).toHaveReceived('info').nTimes(2);

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there are 2 failures in the same context', () => {
          const failures = [[1, 2, 3, 40], [1, 2, 3, 41]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(3);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(3);
          _.expect(consoleProxy).toHaveReceived('info').nTimes(2);

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there are 2 failures in different contexts', () => {
          const failures = [[1, 2, 30, 40], [1, 2, 31, 41]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(4);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(4);
          _.expect(consoleProxy).toHaveReceived('info').nTimes(2);

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there are 2 failures in different methods', () => {
          const failures = [[1, 20, 30, 40], [1, 21, 31, 41]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(5);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(5);
          _.expect(consoleProxy).toHaveReceived('info').nTimes(2);

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });

        _.context('When there are 2 failures in different classes', () => {
          const failures = [[10, 20, 30, 40], [11, 21, 31, 41]];
          const consoleProxy = newConsoleProxy();

          new TestCasePrinter(failures, consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(6);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(6);
          _.expect(consoleProxy).toHaveReceived('info').nTimes(2);

          _.assert(
            'It calls print methods the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });
      });
    });
  }
}
