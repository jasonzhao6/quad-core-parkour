import TestException from '../__TestException__.js';

export default class TestExceptionTest {
  static enqueue(_) {
    _.Class(TestException, () => {
      _.method('#constructor', () => {
        _.context('When creating an exception with args', () => {
          const args = {
            type: TestException.TYPES.ARG,
            message: 'Hello world',
            inspect: {},
          };
          const subject = new _.DescribedClass(args, _.noop());

          _.assert(
            'It initializes the corresponding properties',
            () => [
              subject.type === args.type,
              subject.message === args.message,
              subject.inspect === args.inspect,
            ],
          );
        });

        _.context('When creating an exception without `inspect` arg', () => {
          const subject = new _.DescribedClass({}, _.noop());

          _.assert(
            'It does not initialize the `inspect` properties',
            () => !('inspect' in subject),
          );
        });

        const consoleProxy = _.proxy(console);

        _.allow(consoleProxy).toReceive('error').andReturn();

        new _.DescribedClass({}, consoleProxy); // eslint-disable-line no-new

        _.expect(consoleProxy).toHaveReceived('error');

        _.assert(
          'It calls `console.error` to log a stack trace',
          () => consoleProxy.isAsExpected(),
        );
      });
    });
  }
}
