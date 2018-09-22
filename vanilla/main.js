import Matrix from './js/models/Matrix.js';

//---------------------
// START RUNNING TESTS:
import TestHarness from './__TestHarness__.js';
import Tests from './__Tests__.js';

const seed = 100;
const th = new TestHarness(seed);
Tests.run(th);
// FINISH RUNNING TESTS
//---------------------

console.log('>', Matrix.hello()); // eslint-disable-line
