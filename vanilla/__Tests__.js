/* eslint no-console: ['error', { allow: ['info'] }] */
/* eslint no-underscore-dangle: ['error', { allow: ['__'] }] */

// Testing framework
import TestHarness from './__TestHarness__.js';

// Testing framework tests
import TestCasePrinterTest from './__tests__/TestCasePrinterTest.js';

// Model tests
import CoreTest from './js/models/__tests__/CoreTest.js';
import MatrixTest from './js/models/__tests__/MatrixTest.js';

export default class Tests {
  static run(__) {
    this.runTestingFrameworkTests(__);
    this.runModelTests(__);
  }

  //
  // Private
  //

  static runTestingFrameworkTests(__) {
    TestCasePrinterTest.run(__);
  }

  static runModelTests(__) {
    CoreTest.run(__);
    MatrixTest.run(__);
  }
}

//
// Run on import
//

const seed = new Date().toLocaleTimeString();
const __ = new TestHarness(seed);

console.info('--------------------');
console.info('START RUNNING TESTS:');
console.info('--------------------');

Tests.run(__);
__.executeAssertions();

if (__.pendingCount > 0) console.info(`(${__.pendingCount} pending to do)`);
console.info(`${__.failures.length} failed out of ${__.queue.length}`);
console.info(seed);
console.info('--------------------');
console.info('FINISH RUNNING TESTS');
console.info('--------------------');
