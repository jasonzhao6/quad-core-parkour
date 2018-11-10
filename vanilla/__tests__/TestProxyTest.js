import TestException from '../__TestException__.js';
import TestProxy from '../__TestProxy__.js';

export default class TestProxyTest {
  static enqueue(_) {
    _.Class('TestProxy', () => {
      _.method('.echo', () => {
        const subject = TestProxy.echo();

        _.assert(
          'It echos method names',
          () => [subject.hi() === 'hi', subject.toString() === 'toString'],
        );

        _.assert(
          'It echos method args',
          () => subject.hi('hey', 'sup', 'yo') === 'hi,hey,sup,yo',
        );

        _.assert(
          'It echos boolean method args',
          () => subject.hi(true, false) === 'hi,true,false',
        );

        _.context('When creating 2 echos', () => {
          const subject1 = TestProxy.echo();
          const subject2 = TestProxy.echo();

          _.assert(
            'They are singletons',
            () => subject1 === subject2,
          );
        });
      });

      _.method('.noop', () => {
        const subject = TestProxy.noop();

        _.assert(
          'It does not respond to anything',
          () => [subject.hi() === undefined, subject.toString() === undefined],
        );

        _.context('When creating 2 noops', () => {
          const subject1 = TestProxy.noop();
          const subject2 = TestProxy.noop();

          _.assert(
            'They are singletons',
            () => subject1 === subject2,
          );
        });
      });

      _.method('.verify', () => {
        _.context('When instance is not from described class', () => {
          const func = TestProxy.verify.bind(TestProxy, null, _.noop());
          const error = _.rescue(func);

          _.assert(
            'It throws an `ARG` TestException',
            () => error.type === TestException.TYPES.ARG,
          );
        });

        _.context('When instance is from described class', () => {
          const func = TestProxy.verify.bind(TestProxy, new TestProxy({}));
          const error = _.rescue(func);

          _.assert(
            'It does not throw any exception',
            () => error === null,
          );
        });
      });

      _.method('#constructor', () => {
        const subject = new TestProxy({});

        _.assert(
          'It returns a Proxy, which is not from described class',
          () => !(subject instanceof TestProxy),
        );
      });

      _.method('#allowIt', () => {
        _.context('When used to stub return value', () => {
          const subject = new TestProxy({}, _.noop());
          const returnValue = 'abc';

          subject.allowIt().toReceive('toString').andReturn(returnValue);

          _.assert(
            'It responds to `isProxy` and returns true',
            () => subject.toString() === returnValue,
          );
        });

        _.context('When used to stub a method that does not exist', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.allowIt();
          const error = _.rescue(thisArg.toReceive.bind(thisArg, 'foo'));

          _.assert(
            'It throws a `VERIFY` TestException',
            () => error.type === TestException.TYPES.VERIFY,
          );
        });

        _.context('When chained with expect method: `toHaveReceived`', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.allowIt();
          const func = thisArg.toHaveReceived.bind(thisArg, 'toString');
          const error = _.rescue(func);

          _.assert(
            'It throws a `CHAIN` TestException',
            () => error.type === TestException.TYPES.CHAIN,
          );
        });

        _.context('When chained with expect method: `withArgs`', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.allowIt().toReceive('toString');
          const error = _.rescue(thisArg.withArgs.bind(thisArg));

          _.assert(
            'It throws a `CHAIN` TestException',
            () => error.type === TestException.TYPES.CHAIN,
          );
        });

        _.context('When chained with expect method: `nTimes`', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.allowIt().toReceive('toString');
          const error = _.rescue(thisArg.nTimes.bind(thisArg));

          _.assert(
            'It throws a `CHAIN` TestException',
            () => error.type === TestException.TYPES.CHAIN,
          );
        });
      });

      _.method('#expectIt / #isAsExpected', () => {
        _.context('When used to test a method was called once', () => {
          const subject = new TestProxy({}, _.noop());
          subject.allowIt().toReceive('toString');

          subject.toString();
          subject.expectIt().toHaveReceived('toString');

          _.assert(
            'It was called once',
            () => subject.isAsExpected(),
          );
        });

        _.context('When used to test a method was called N times', () => {
          const subject = new TestProxy({}, _.noop());
          subject.allowIt().toReceive('toString');

          const nTimes = 4;
          new Array(nTimes).fill().forEach(() => subject.toString());
          subject.expectIt().toHaveReceived('toString').nTimes(nTimes);

          _.assert(
            'It was called N times',
            () => subject.isAsExpected(),
          );
        });

        _.context('When used to test 2 methods were called N, M times', () => {
          const subject = new TestProxy({}, _.noop());
          subject.allowIt().toReceive('toString');
          subject.allowIt().toReceive('valueOf');

          const nTimes = 4;
          const mTimes = 6;
          new Array(nTimes).fill().forEach(() => subject.toString());
          new Array(mTimes).fill().forEach(() => subject.valueOf());
          subject.expectIt().toHaveReceived('toString').nTimes(nTimes);
          subject.expectIt().toHaveReceived('valueOf').nTimes(mTimes);

          _.assert(
            'They were called N and M times',
            () => subject.isAsExpected(),
          );
        });

        _.context('When used to test a method was called with args', () => {
          const args = 'args';
          const subject = new TestProxy({}, _.noop());
          subject.allowIt().toReceive('valueOf');

          subject.valueOf(args);
          subject.expectIt().toHaveReceived('valueOf').withArgs(args).nTimes(1);

          _.assert(
            'It was called once',
            () => subject.isAsExpected(),
          );
        });

        _.context('When args were almost the same but not quite', () => {
          const args = { a: 1 };
          const expectedArgs = { a: '1' };
          const subject = new TestProxy({}, _.noop());
          subject.allowIt().toReceive('toString');

          subject.toString(args);
          subject.expectIt().toHaveReceived('toString').withArgs(expectedArgs);

          _.assert(
            'It was called once',
            () => subject.isAsExpected().map(expectation => !expectation),
          );
        });

        _.context('When used to test a method that does not exist', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.expectIt();
          const error = _.rescue(thisArg.toHaveReceived.bind(thisArg, 'foo'));

          _.assert(
            'It throws a `VERIFY` TestException',
            () => error.type === TestException.TYPES.VERIFY,
          );
        });

        _.context('When chained with allow method: `toReceive`', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.expectIt();
          const error = _.rescue(thisArg.toReceive.bind(thisArg, 'toString'));

          _.assert(
            'It throws a `CHAIN` TestException',
            () => error.type === TestException.TYPES.CHAIN,
          );
        });

        _.context('When chained with allow method: `andReturn`', () => {
          const subject = new TestProxy({}, _.noop());
          const thisArg = subject.expectIt().toHaveReceived('toString');
          const error = _.rescue(thisArg.andReturn.bind(thisArg));

          _.assert(
            'It throws a `CHAIN` TestException',
            () => error.type === TestException.TYPES.CHAIN,
          );
        });
      });

      _.method('#isProxy', () => {
        const subject = new TestProxy({});

        _.assert(
          'It responds to `isProxy` and returns true',
          () => ['isProxy' in subject, subject.isProxy === true],
        );
      });

      _.method('#debugger', () => {
        const subject = new TestProxy({});

        _.assert(
          'It responds to `debugger`',
          () => 'debugger' in subject,
        );
      });
    });
  }
}
