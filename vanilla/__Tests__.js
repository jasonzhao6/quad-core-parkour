import __TestHarness__ from './__TestHarness__.js';

import CoreTest from './js/models/__tests__/CoreTest.js';
import MatrixTest from './js/models/__tests__/MatrixTest.js';

export default class Tests {
  static run(th) {
    this.runModelTests(th);
  }

  //
  // Private
  //

  static runModelTests(th) {
    CoreTest.run(th);
    MatrixTest.run(th);
  }
}

// Run tests on import
const seed = new Date().toLocaleString();
console.info(seed); // eslint-disable-line
console.info('--------------------'); // eslint-disable-line
console.info('START RUNNING TESTS:'); // eslint-disable-line
console.info('--------------------'); // eslint-disable-line
const th = new __TestHarness__(seed);
Tests.run(th);
th.executeAssertions();
console.info('--------------------'); // eslint-disable-line
console.info('FINISH RUNNING TESTS'); // eslint-disable-line
console.info('--------------------'); // eslint-disable-line
