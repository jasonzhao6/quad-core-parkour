import Core from '../Core.js';

export default class CoreTest {
  static run(th) {
    th.klass('Core', () => {
      th.method('#hello', () => {
        th.context('When A...', () => {
          th.assert('It a...', () => 1 !== 1);
          th.assert('It b...', () => 1 !== 0);
        });

        th.context('When AA...', () => {
          th.assert('It aa...', () => 2 !== 2);
          th.assert('It bb...', () => 2 !== 1);
          th.assert('It cc...', () => 2 !== 0);
        });
      });
    });
  }
}
