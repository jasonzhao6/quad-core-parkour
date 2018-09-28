/* eslint no-console: ['error', { allow: ['info'] }] */

import __TestHarness__ from './__TestHarness__.js';

import TestCasePrinterTest from './__tests__/TestCasePrinterTest.js';

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
// Run on import
//

const seed = new Date().toLocaleTimeString();
const th = new __TestHarness__(seed);

console.info('--------------------');
console.info('START RUNNING TESTS:');
console.info('--------------------');

Tests.run(th);
th.executeAssertions();

if (th.pendingCount > 0) console.info(`(${th.pendingCount} pending to do)`);
console.info(`${th.failures.length} failed out of ${th.queue.length}`);
console.info(seed);
console.info('--------------------');
console.info('FINISH RUNNING TESTS');
console.info('--------------------');
