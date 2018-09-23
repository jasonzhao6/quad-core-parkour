import TestCasePrinter from '../__TestCasePrinter__.js';

export default class TestCasePrinterTest {
  static run(th) {
    th.Class(TestCasePrinter, () => {
      th.method('#constructor', () => {
        th.context('When creating a test case printer', () => {
          const failures = [];
          const subject = new TestCasePrinter(failures);

          th.assert(
            'It initializes the `failures` property',
            () => subject.failures === failures,
          );

          th.assert(
            'It initializes each `last*` property to null',
            () => [
              subject.lastClassName === null,
              subject.lastMethodName === null,
              subject.lastContextString === null,
            ],
          );
        });
      });
    });
  }
}
