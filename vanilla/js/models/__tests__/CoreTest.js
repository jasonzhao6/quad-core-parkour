import Core from '../Core.js';

export default class CoreTest {
  static run(th) {
    th.Class(Core, () => {
      th.method('#constructor', () => {
        th.context('When creating a core', () => {
          const subject = new Core();

          th.assert(
            'It initializes accumulator to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          th.assert(
            'It initializes backup to default value',
            () => subject.backup === Core.DEFAULT_VALUE,
          );
        });
      });
    });
  }
}
