import TestCasePrinter from '../__TestCasePrinter__.js';

export default class TestCasePrinterTest {
  static run(th) {
    th.Class(TestCasePrinter, () => {
      th.method('#constructor', () => {
        th.context('When creating a printer', () => {
          const failures = [];
          const subject = new th.DescribedClass(failures);

          th.assert(
            'It initializes the `failures` property',
            () => subject.failures === failures,
          );

          th.assert(
            'It initializes each `last*` property to null',
            () => [
              subject.lastClass === null,
              subject.lastMethod === null,
              subject.lastContext === null,
            ],
          );
        });

        th.context('When creating a printer without console override', () => {
          const subject = new th.DescribedClass([]);

          th.assert(
            'It initializes the `console` property',
            () => subject.console === console,
          );
        });

        th.context('When creating a printer with console override', () => {
          const failures = [[1, 2, 3, 4]];
          const consoleOverride = {};
          const subject = new th.DescribedClass(failures, consoleOverride);

          th.assert(
            'It initializes the `console` property',
            () => subject.console === consoleOverride,
          );
        });
      });

      th.method('#print', () => {
        const consoleNoop = th.noop();
        const subject = new th.DescribedClass([[1, 2, 3, 4]], consoleNoop);

        subject.print();

        th.assert(
          'It resets all the `last*` states when done',
          () => [
            subject.lastClass === null,
            subject.lastMethod === null,
            subject.lastContext === null,
          ],
        );

        th.context('When there is one failure to print', () => {
          const consoleProxy = th.proxy(console);

          th.allow(consoleProxy).toReceive('group').andReturn();
          th.allow(consoleProxy).toReceive('groupEnd').andReturn();
          th.allow(consoleProxy).toReceive('info').andReturn();

          new th.DescribedClass([[1, 2, 3, 4]], consoleProxy).print();

          th.expect(consoleProxy).toHaveReceived('group').nTimes(3);
          th.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(3);
          th.expect(consoleProxy).toHaveReceived('info');

          th.assert(
            'Its methods were called the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });
      });
    });
  }
}
