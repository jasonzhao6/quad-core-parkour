/* eslint no-console: ['error', { allow: ['info'] }] */

// Testing framework
import TestHarness from './__TestHarness__.js';

// Testing framework tests
import TestCasePrinterTest from './__tests__/TestCasePrinterTest.js';
import TestExceptionTest from './__tests__/TestExceptionTest.js';
import TestHarnessTest from './__tests__/TestHarnessTest.js';
import TestProxyTest from './__tests__/TestProxyTest.js';

// Model tests
import CoreTest from './js/models/__tests__/CoreTest.js';
import DirectorTest from './js/models/__tests__/DirectorTest.js';
import MatrixTest from './js/models/__tests__/MatrixTest.js';

export default class Tests {
  static enqueue(_) {
    this.enqueueTestingFrameworkTests(_);
    this.enqueueModelTests(_);
  }

  //
  // Private
  //

  static enqueueTestingFrameworkTests(_) {
    TestCasePrinterTest.enqueue(_);
    TestExceptionTest.enqueue(_);
    TestHarnessTest.enqueue(_);
    TestProxyTest.enqueue(_);
  }

  static enqueueModelTests(_) {
    CoreTest.enqueue(_);
    DirectorTest.enqueue(_);
    MatrixTest.enqueue(_);
  }
}

//
// Run on import
//

const startTime = new Date();
const seed = startTime.toLocaleTimeString();
const _ = new TestHarness(seed);

console.info('--------------------');
console.info('START RUNNING TESTS:');
console.info('--------------------');

Tests.enqueue(_);
_.executeAssertions();

if (_.pendingCount > 0) console.info(`(${_.pendingCount} pending to do)`);
console.info(`${_.failures.length} failed out of ${_.queue.length}`);
console.info(`${seed} | ${new Date() - startTime} ms`);
console.info('--------------------');
console.info('FINISH RUNNING TESTS');
console.info('--------------------');
