/* global window */

import TestCasePrinter from '../__TestCasePrinter__.js';
import TestProxy from '../__TestProxy__.js';

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
              subject.lastClassName === null,
              subject.lastMethodName === null,
              subject.lastContextString === null,
            ],
          );
        });

        th.context('When creating a printer without console override', () => {
          const subject = new th.DescribedClass([]);

          th.assert(
            'It initializes the `console` property to `window.console`',
            () => subject.console === window.console,
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
            subject.lastClassName === null,
            subject.lastMethodName === null,
            subject.lastContextString === null,
          ],
        );

        th.context('When there is one failure to print', () => {
          const consoleProxy = new TestProxy(console);
          consoleProxy.expectMethod('group').andReturn().nTimes(3);
          consoleProxy.expectMethod('info').andReturn().nTimes(1);
          consoleProxy.expectMethod('groupEnd').andReturn().nTimes(3);

          new th.DescribedClass([[1, 2, 3, 4]], consoleProxy).print();

          th.assert(
            'It prints the expected number of times',
            () => consoleProxy.asExpected(),
          );
        });
      });
    });
  }
}
