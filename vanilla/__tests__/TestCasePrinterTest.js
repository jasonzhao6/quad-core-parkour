/* global window */

import TestCasePrinter from '../__TestCasePrinter__.js';
import TestProxy from '../__TestProxy__.js';

export default class TestCasePrinterTest {
  static run(th) {
    th.Class(TestCasePrinter, () => {
      th.method('#constructor', () => {
        th.context('When creating a printer', () => {
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

        th.context('When creating a printer without console override', () => {
          const subject = new TestCasePrinter();

          th.assert(
            'It initializes the `console` property to `window.console`',
            () => subject.console === window.console,
          );
        });

        th.context('When creating a printer with console override', () => {
          const failures = [[1, 2, 3, 4]];
          const consoleProxy = TestProxy.wrap(console);
          const subject = new TestCasePrinter(failures, consoleProxy);

          th.assert(
            'It initializes the `console` property',
            () => subject.console === consoleProxy,
          );
        });
      });
    });
  }
}
