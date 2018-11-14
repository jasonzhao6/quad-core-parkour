/* eslint no-console: ['error', { allow: ['info'] }] */

// Testing framework
import TestHarness from './__TestHarness__.js';

// Testing framework tests
import TestCasePrinterTest from './__tests__/TestCasePrinterTest.js';
import TestExceptionTest from './__tests__/TestExceptionTest.js';
import TestHarnessTest from './__tests__/TestHarnessTest.js';
import TestProxyTest from './__tests__/TestProxyTest.js';

// Model tests
import CoreTest from './models/__tests__/CoreTest.js';
import DirectorTest from './models/__tests__/DirectorTest.js';
import EscrowTest from './models/__tests__/EscrowTest.js';
import LevelTest from './models/__tests__/LevelTest.js';
import LineManagerTest from './models/__tests__/LineManagerTest.js';
import LineWorkerTest from './models/__tests__/LineWorkerTest.js';
import MatrixTest from './models/__tests__/MatrixTest.js';

// View tests
import ImageViewTest from './views/IOView/__tests__/ImageViewTest.js';
import InfoViewTest from './views/LevelView/__tests__/InfoViewTest.js';
import InViewTest from './views/IOView/__tests__/InViewTest.js';
import LevelViewTest from './views/EntryPoints/__tests__/LevelViewTest.js';

// View helper tests
import ViewHelperTest from './views/__tests__/ViewHelperTest.js';

class Tests {
  static enqueue(_) {
    this.enqueueTestingFrameworkTests(_);
    this.enqueueModelTests(_);
    this.enqueueViewTests(_);
    this.enqueueViewHelperTests(_);
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
    EscrowTest.enqueue(_);
    LevelTest.enqueue(_);
    LineManagerTest.enqueue(_);
    LineWorkerTest.enqueue(_);
    MatrixTest.enqueue(_);
  }

  static enqueueViewTests(_) {
    ImageViewTest.enqueue(_);
    InfoViewTest.enqueue(_);
    InViewTest.enqueue(_);
    LevelViewTest.enqueue(_);
  }

  static enqueueViewHelperTests(_) {
    ViewHelperTest.enqueue(_);
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
