import Matrix from '../Matrix.js';

export default class MatrixTest {
  static run(th) {
    th.assert(
      '#hello',
      'It says hello',
      () => Matrix.hello() === 'hello matrix',
    );
  }
}
