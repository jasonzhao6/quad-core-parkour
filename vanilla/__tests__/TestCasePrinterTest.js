import TestCasePrinter from '../__TestCasePrinter__.js';

export default class TestCasePrinterTest {
  static run(_) {
    _.Class(TestCasePrinter, () => {
      _.method('#constructor', () => {
        _.context('When creating a printer', () => {
          const failures = [];
          const subject = new _.DescribedClass(failures);

          _.assert(
            'It initializes the `failures` property',
            () => subject.failures === failures,
          );

          _.assert(
            'It initializes each `last*` property to null',
            () => [
              subject.lastClass === null,
              subject.lastMethod === null,
              subject.lastContext === null,
            ],
          );
        });

        _.context('When creating a printer without console override', () => {
          const subject = new _.DescribedClass([]);

          _.assert(
            'It initializes the `console` property',
            () => subject.console === console,
          );
        });

        _.context('When creating a printer with console override', () => {
          const failures = [[1, 2, 3, 4]];
          const consoleOverride = {};
          const subject = new _.DescribedClass(failures, consoleOverride);

          _.assert(
            'It initializes the `console` property',
            () => subject.console === consoleOverride,
          );
        });
      });

      _.method('#print', () => {
        const consoleNoop = _.noop();
        const subject = new _.DescribedClass([[1, 2, 3, 4]], consoleNoop);

        subject.print();

        _.assert(
          'It resets all the `last*` states when done',
          () => [
            subject.lastClass === null,
            subject.lastMethod === null,
            subject.lastContext === null,
          ],
        );

        _.context('When there is one failure to print', () => {
          const consoleProxy = _.proxy(console);

          _.allow(consoleProxy).toReceive('group').andReturn();
          _.allow(consoleProxy).toReceive('groupEnd').andReturn();
          _.allow(consoleProxy).toReceive('info').andReturn();

          new _.DescribedClass([[1, 2, 3, 4]], consoleProxy).print();

          _.expect(consoleProxy).toHaveReceived('group').nTimes(3);
          _.expect(consoleProxy).toHaveReceived('groupEnd').nTimes(3);
          _.expect(consoleProxy).toHaveReceived('info');

          _.assert(
            'Its methods were called the expected number of times',
            () => consoleProxy.isAsExpected(),
          );
        });
      });
    });
  }
}
