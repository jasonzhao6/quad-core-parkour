import Matrix from '../Matrix.js';

export default class MatrixTest {
  static run(th) {
    th.klass('Matrix', () => {
      th.method('#hello', () => {
        th.context('When 10...', () => {
          th.assert('It 1...', () => 1 === 1);
          th.assert('It 2...', () => 1 === 0);
        });

        th.context('When 20...', () => {
          th.assert('It 11...', () => 2 === 2);
          th.assert('It 22...', () => 2 === 1);
          th.assert('It 33...', () => 2 === 0);
        });
      });
    });
  }
}
