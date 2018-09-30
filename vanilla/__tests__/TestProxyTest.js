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


      // TODO setup methods


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
