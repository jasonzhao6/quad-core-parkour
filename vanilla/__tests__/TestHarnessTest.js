/* eslint class-methods-use-this: ['error', { exceptMethods: ['print'] }] */

import TestHarness from '../__TestHarness__.js';

export default class TestHarnessTest {
  static enqueue(_) {
    _.Class('TestHarness', () => {
      _.method('#constructor', () => {
        _.context('When creating a test harness with `seed` arg', () => {
          const seed = 'foo';
          const subject = new TestHarness(seed);

          _.assert(
            'It initializes the `seed` property',
            () => subject.seed === seed,
          );
        });

        _.context('When creating a test harness', () => {
          const subject = new TestHarness();

          _.assert(
            'It initializes all of the current context',
            () => [
              subject.currentClass === null,
              subject.currentMethod === null,
              subject.currentContext === null,
              subject.currentAssertion === null,
            ],
          );

          _.assert(
            'It initializes all the state vars',
            () => [
              subject.queue instanceof Array,
              subject.queue.length === 0,
              subject.failures instanceof Array,
              subject.failures.length === 0,
              subject.pendingCount === 0,
              subject.assertingOne === false,
            ],
          );
        });
      });

      _.method('#Class', () => {
        const Class = 'Class';
        const subject = new TestHarness();
        let callCount = 0;

        subject.Class(Class, () => { callCount += 1; });

        _.assert(
          'It executes `block`',
          () => callCount === 1,
        );

        _.assert(
          'It resets `currentClass` when done',
          () => subject.currentClass === null,
        );
      });

      _.method('#method', () => {
        const subject = new TestHarness();
        let callCount = 0;

        subject.method('#method', () => { callCount += 1; });

        _.assert(
          'It executes `block`',
          () => callCount === 1,
        );

        _.assert(
          'It resets `currentMethod` when done',
          () => subject.currentMethod === null,
        );
      });

      _.method('#context', () => {
        const subject = new TestHarness();
        let callCount = 0;

        subject.method('When ...', () => { callCount += 1; });

        _.assert(
          'It executes `block`',
          () => callCount === 1,
        );

        _.assert(
          'It resets `currentContext` when done',
          () => subject.currentContext === null,
        );
      });

      _.method('#assert', () => {
        const assertion = 'Assertion';

        _.context('When `assertingOne` is false', () => {
          const subject = new TestHarness();

          subject.assert('It ...', assertion);

          _.assert(
            'It enqueues `assertion`',
            () => [
              subject.queue.length === 1,
              subject.queue[0].assertion === assertion,
            ],
          );

          _.assert(
            'It resets `currentAssertion` when done',
            () => subject.currentAssertion === null,
          );
        });

        _.context('When `assertingOne` is true', () => {
          const subject = new TestHarness();
          subject.assertingOne = true;

          subject.assert('It ...', assertion);

          _.assert(
            'It does not enque `assertion`',
            () => subject.queue.length === 0,
          );

          _.assert(
            'It does not set `currentAssertion`',
            () => subject.currentAssertion === null,
          );
        });
      });

      _.method('#assertOne', () => {
        const assertion = 'Assertion';

        _.context('When `assertingOne` is false', () => {
          const subject = new TestHarness();

          subject.assertOne('It ...', assertion);

          _.assert(
            'It enqueues only this one `assertion`',
            () => [
              subject.queue.length === 1,
              subject.queue[0].assertion === assertion,
            ],
          );

          _.assert(
            'It resets `currentAssertion` when done',
            () => subject.currentAssertion === null,
          );

          _.assert(
            'It sets `assertingOne` to `true`',
            () => subject.assertingOne === true,
          );
        });

        _.context('When `assertingOne` is false, and queue is present', () => {
          const subject = new TestHarness();
          subject.assert('It ...', 'Other assertion');

          subject.assertOne('It ...', assertion);

          _.assert(
            'It enqueues only this one `assertion`',
            () => [
              subject.queue.length === 1,
              subject.queue[0].assertion === assertion,
            ],
          );

          _.assert(
            'It resets `currentAssertion` when done',
            () => subject.currentAssertion === null,
          );

          _.assert(
            'It sets `assertingOne` to `true`',
            () => subject.assertingOne === true,
          );
        });

        _.context('When `assertingOne` is true', () => {
          const subject = new TestHarness();
          subject.assertingOne = true;

          subject.assertOne('It ...', assertion);

          _.assert(
            'It does not enque `assertion`',
            () => subject.queue.length === 0,
          );

          _.assert(
            'It does not set `currentAssertion`',
            () => subject.currentAssertion === null,
          );
        });
      });

      _.method('#xassert', () => {
        const subject = new TestHarness();
        const assertion = 'Assertion';

        subject.xassert('It ...', assertion);

        _.assert(
          'It dosen not enqueues `assertion`',
          () => subject.queue.length === 0,
        );

        _.assert(
          'It increments `pendingCount`',
          () => subject.pendingCount === 1,
        );
      });

      _.method('#executeAssertions', () => {
        let printed = false;
        let failures = null;

        class Printer {
          constructor(arg) {
            failures = arg;
          }

          print() {
            printed = true;
          }
        }

        let executedCount = 0;
        const queue = [];
        const successFn = () => { executedCount += 1; return true; };
        const failureFn = () => { executedCount += 1; return false; };

        // 1 in 13!, or 6 billion, chance of getting same array after shuffle.
        const assertionCount = 13;
        const failureCount = 10;
        new Array(assertionCount).fill().forEach((_undefined, index) => {
          queue.push({
            currentClass: `Class-${index}`,
            currentMethod: `method-${index}`,
            currentContext: `context-${index}`,
            currentAssertion: `assertion-${index}`,
            assertion: index < failureCount ? failureFn : successFn,
          });
        });


        const subject = new TestHarness('seed', Printer);
        subject.queue = [...queue];
        subject.executeAssertions();

        _.assert(
          'It shuffles the `queue`',
          () => [
            subject.queue.length === queue.length,
            subject.queue.map(test => test.currentClass).join() !==
               queue.map(test => test.currentClass).join(),
          ],
        );

        _.assert(
          'It performs all assertions',
          () => executedCount === assertionCount,
        );

        _.assert(
          'It sends all failures, sorted, to printer',
          () => [
            failures.length === failureCount,
            failures.join() === failures.sort().join(),
          ],
        );

        _.assert(
          'It prints',
          () => printed === true,
        );
      });

      _.method('#proxy', () => {
        const subject = new TestHarness();

        _.assert(
          'It returns a proxy',
          () => subject.proxy({}).isProxy,
        );
      });

      _.method('#allow', () => {
        const subject = new TestHarness();
        const instanceProxy = subject.proxy({});

        _.assert(
          'It delegates to `allowIt` method',
          () => subject.allow(instanceProxy) === instanceProxy.allowIt(),
        );
      });

      _.method('#expect', () => {
        const subject = new TestHarness();
        const instanceProxy = subject.proxy({});

        _.assert(
          'It delegates to `expectIt` method',
          () => subject.expect(instanceProxy) === instanceProxy.expectIt(),
        );
      });

      _.method('#echo', () => {
        const subject = new TestHarness();

        _.assert(
          'It returns a proxy that echos the method name on any method call',
          () => subject.echo().toString() === 'toString',
        );
      });

      _.method('#noop', () => {
        const subject = new TestHarness();

        _.assert(
          'It returns a proxy that noops on any method call',
          () => subject.noop().toString() === undefined,
        );
      });
    });
  }
}
