import Core from '../Core.js';

export default class CoreTest {
  static run(th) {
    th.Class(Core, () => {
      th.method('#constructor', () => {
        th.context('When creating a core', () => {
          const subject = new Core();

          th.assert(
            'It initializes accumulator to 0',
            () => subject.accumulator === 0,
          );

          th.assert(
            'It initializes backup to 0',
            () => subject.backup === 0,
          );
        });
      });
    });
  }
}
