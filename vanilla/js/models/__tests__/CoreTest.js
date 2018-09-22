import Core from '../Core.js';

export default class CoreTest {
  static run(th) {
    th.assert(
      '#hello',
      'Core says hello',
      () => Core.hello() === 'hello core',
    );
  }
}
