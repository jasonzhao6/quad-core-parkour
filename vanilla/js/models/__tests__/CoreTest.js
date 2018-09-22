import Core from '../Core.js';

export default class CoreTest {
  static run(th) {
    // th.assert(
    //   '#hello',
    //   'Core says hello',
    //   () => Core.hello() === 'hello core',
    // );
    th.module('Core', () => {
      th.method('#hi', () => {
        th.context('When A ...', () => {
          th.assert('It a ...', () => console.log('a'));
          th.assert('It b ...', () => console.log('b'));
          th.assert('It c ...', () => console.log('c'));
        });

        th.context('When AA ...', () => {
          th.assert('It aa ...', () => console.log('aa'));
          th.assert('It bb ...', () => console.log('bb'));
          th.assert('It cc ...', () => console.log('cc'));
        });
      });
    });
  }
}
