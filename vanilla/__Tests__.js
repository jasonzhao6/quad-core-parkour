/* eslint no-console: ['error', { allow: ['info'] }] */
/* eslint no-underscore-dangle: ['error', { allow: ['__'] }] */

import __TestHarness__ from './__TestHarness__.js';

import TestCasePrinterTest from './__tests__/TestCasePrinterTest.js';

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
const __ = new __TestHarness__(seed);

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
