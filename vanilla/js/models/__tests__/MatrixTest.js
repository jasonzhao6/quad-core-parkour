import Matrix from '../Matrix.js';

export default class MatrixTest {
  static run() {
    console.assert(Matrix.hello() === 'hello matrix', 'It failed.'); // eslint-disable-line
  }
}
