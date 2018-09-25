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
          const consoleOverride = {};
          const subject = new TestCasePrinter(failures, consoleOverride);

          th.assert(
            'It initializes the `console` property',
            () => subject.console === consoleOverride,
          );
        });
      });

      th.method('#print', () => {
        const subject = new TestCasePrinter([[1, 2, 3, 4]], TestProxy.noop());
        subject.print();

        th.assert(
          'It does its thing, then it resets all the `last*` states',
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

          new TestCasePrinter([[1, 2, 3, 4]], consoleProxy).print();

          th.assert(
            'It prints the expected number of times',
            () => consoleProxy.asExpected(),
          );
        });
      });
    });
  }
}
