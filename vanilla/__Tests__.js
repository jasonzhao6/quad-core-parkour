import __TestHarness__ from './__TestHarness__.js';

// Testing framework tests
import TestCasePrinterTest from './__tests__/TestCasePrinterTest.js';

// Model tests
import CoreTest from './js/models/__tests__/CoreTest.js';
import MatrixTest from './js/models/__tests__/MatrixTest.js';

export default class Tests {
  static run(th) {
    this.runTestingFrameworkTests(th);
    this.runModelTests(th);
  }

  //
  // Private
  //

  static runTestingFrameworkTests(th) {
    TestCasePrinterTest.run(th);
  }

  static runModelTests(th) {
    CoreTest.run(th);
    MatrixTest.run(th);
  }
}

//
// Run tests on import
//

const seed = new Date().toLocaleTimeString();

/* eslint-disable no-console */
console.info('--------------------');
console.info('START RUNNING TESTS:');
console.info('--------------------');
/* eslint-enable no-console */

const th = new __TestHarness__(seed);
Tests.run(th);
th.executeAssertions();

/* eslint-disable no-console */
if (th.pendingCount > 0) console.info(`(${th.pendingCount} pending to do)`);
console.info(`${th.failures.length} failed out of ${th.queue.length}`);
console.info(seed);
console.info('--------------------');
console.info('FINISH RUNNING TESTS');
console.info('--------------------');
/* eslint-enable no-console */
