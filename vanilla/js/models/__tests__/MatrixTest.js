import Matrix from '../Matrix.js';

export default class MatrixTest {
  static run(th) {
    // th.assert(
    //   '#hello',
    //   'Matrix says hello',
    //   () => Matrix.hello() === 'hello matrix',
    // );
    th.module('Matrix', () => {
      th.method('#hello', () => {
        th.context('When 1 ...', () => {
          th.assert('It 1 ...', () => console.log(1));
          th.assert('It 2 ...', () => console.log(2));
          th.assert('It 3 ...', () => console.log(3));
        });

        th.context('When 2 ...', () => {
          th.assert('It 11 ...', () => console.log(11));
          th.assert('It 22 ...', () => console.log(22));
          th.assert('It 33 ...', () => console.log(33));
        });
      });
    });
  }
}
