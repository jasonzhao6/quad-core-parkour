import TestException from '../__TestException__.js';
import TestProxy from '../__TestProxy__.js';

export default class TestProxyTest {
  static enqueue(_) {
    _.Class(TestProxy, () => {
      _.method('.noop', () => {
        const subject = _.DescribedClass.noop();

        _.assert(
          'It does not respond to anything',
          () => [subject.hi() === undefined, subject.toString() === undefined],
        );

        _.context('When creating 2 noops', () => {
          const subject1 = _.DescribedClass.noop();
          const subject2 = _.DescribedClass.noop();

          _.assert(
            'They are singletons',
            () => subject1 === subject2,
          );
        });
      });

      _.method('.verify', () => {
        _.context('When instance is not a TestProxy', () => {
          const errors = [];

          try {
            _.DescribedClass.verify(null, _.noop());
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a TestException',
              () => [errors.length === 1, errors[0] instanceof TestException],
            );
          }
        });

        _.context('When instance is a TestProxy', () => {
          const errors = [];

          try {
            _.DescribedClass.verify(new TestProxy({}));
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It does not throw any exception',
              () => errors.length === 0,
            );
          }
        });
      });

      _.method('#constructor', () => {
        const subject = new _.DescribedClass({});

        _.assert(
          'It returns a Proxy, which is not a TestProxy',
          () => !(subject instanceof TestProxy),
        );
      });

      _.method('#allowIt', () => {
        _.context('When used to stub return value', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const returnValue = 'abc';

          subject.allowIt().toReceive('toString').andReturn(returnValue);

          _.assert(
            'It responds to `isProxy` and returns true',
            () => subject.toString() === returnValue,
          );
        });

        _.context('When used to stub a method that does not exist', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const errors = [];

          try {
            subject.allowIt().toReceive('foo');
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a `VERIFY` TestException',
              () => [
                errors.length === 1,
                errors[0] instanceof TestException,
                errors[0].type === TestException.TYPES.VERIFY,
              ],
            );
          }
        });

        _.context('When chained with expect method: `toHaveReceived`', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const errors = [];

          try {
            subject.allowIt().toHaveReceived('toString');
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a `CHAIN` TestException',
              () => [
                errors.length === 1,
                errors[0] instanceof TestException,
                errors[0].type === TestException.TYPES.CHAIN,
              ],
            );
          }
        });

        _.context('When chained with expect method: `nTimes`', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const errors = [];

          try {
            subject.allowIt().toReceive('toString').nTimes();
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a `CHAIN` TestException',
              () => [
                errors.length === 1,
                errors[0] instanceof TestException,
                errors[0].type === TestException.TYPES.CHAIN,
              ],
            );
          }
        });
      });

      _.method('#expectIt / #isAsExpected', () => {
        _.context('When used to expect a method was called once', () => {
          const subject = new _.DescribedClass({}, _.noop());
          subject.allowIt().toReceive('toString');

          subject.toString();
          subject.expectIt().toHaveReceived('toString');

          _.assert(
            'It was called once',
            () => subject.isAsExpected(),
          );
        });

        _.context('When used to expect a method was called N times', () => {
          const subject = new _.DescribedClass({}, _.noop());
          subject.allowIt().toReceive('toString');

          const nTimes = 4;
          new Array(nTimes).fill().forEach(() => subject.toString());
          subject.expectIt().toHaveReceived('toString').nTimes(nTimes);

          _.assert(
            'It was called N times',
            () => subject.isAsExpected(),
          );
        });

        _.context('When used to expect 2 methods was called N, M times', () => {
          const subject = new _.DescribedClass({}, _.noop());
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

        _.context('When used to test a method that does not exist', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const errors = [];

          try {
            subject.expectIt().toHaveReceived('foo');
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a `VERIFY` TestException',
              () => [
                errors.length === 1,
                errors[0] instanceof TestException,
                errors[0].type === TestException.TYPES.VERIFY,
              ],
            );
          }
        });

        _.context('When chained with allow method: `toReceive`', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const errors = [];

          try {
            subject.expectIt().toReceive('toString');
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a `CHAIN` TestException',
              () => [
                errors.length === 1,
                errors[0] instanceof TestException,
                errors[0].type === TestException.TYPES.CHAIN,
              ],
            );
          }
        });

        _.context('When chained with allowIt method: `andReturn`', () => {
          const subject = new _.DescribedClass({}, _.noop());
          const errors = [];

          try {
            subject.expectIt().toHaveReceived('toString').andReturn();
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a `CHAIN` TestException',
              () => [
                errors.length === 1,
                errors[0] instanceof TestException,
                errors[0].type === TestException.TYPES.CHAIN,
              ],
            );
          }
        });
      });

      _.method('#isProxy', () => {
        const subject = new _.DescribedClass({});

        _.assert(
          'It responds to `isProxy` and returns true',
          () => ['isProxy' in subject, subject.isProxy === true],
        );
      });

      _.method('#debugger', () => {
        const subject = new _.DescribedClass({});

        _.assert(
          'It responds to `debugger`',
          () => 'debugger' in subject,
        );
      });
    });
  }
}
