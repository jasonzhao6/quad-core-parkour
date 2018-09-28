import TestCasePrinter from '../__TestCasePrinter__.js';

export default class TestCasePrinterTest {
  static run(__) {
    __.Class(TestCasePrinter, () => {
      __.method('#constructor', () => {
        __.context('When creating a printer', () => {
          const failures = [];
          const subject = new __.DescribedClass(failures);

          __.assert(
            'It initializes the `failures` property',
            () => subject.failures === failures,
          );

          __.assert(
            'It initializes each `last*` property to null',
            () => [
              subject.lastClass === null,
              subject.lastMethod === null,
              subject.lastContext === null,
            ],
          );
        });

        __.context('When creating a printer without console override', () => {
          const subject = new __.DescribedClass([]);

          __.assert(
            'It initializes the `console` property',
            () => subject.console === console,
          );
        });

        __.context('When creating a printer with console override', () => {
          const failures = [[1, 2, 3, 4]];
          const consoleOverride = {};
          const subject = new __.DescribedClass(failures, consoleOverride);

          __.assert(
            'It initializes the `console` property',
            () => subject.console === consoleOverride,
          );
        });
      });

      __.method('#print', () => {
        const consoleNoop = __.noop();
        const subject = new __.DescribedClass([[1, 2, 3, 4]], consoleNoop);

        subject.print();

        __.assert(
          'It resets all the `last*` states when done',
          () => [
            subject.lastClass === null,
            subject.lastMethod === null,
            subject.lastContext === null,
          ],
        );

        __.context('When there is one failure to print', () => {
          const consoleProxy = __.proxy(console);

          __.allow(consoleProxy).toReceive('group').andReturn();
          __.allow(consoleProxy).toReceive('groupEnd').andReturn();
          __.allow(consoleProxy).toReceive('info').andReturn();

          new __.DescribedClass([[1, 2, 3, 4]], consoleProxy).print();

          __.expect(consoleProxy).toHaveReceived('group').nTimes(3);
          __.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(3);
          __.expect(consoleProxy).toHaveReceived('info');

          __.assert(
            'Its methods were called the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });
      });
    });
  }
}
