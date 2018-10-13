import Core from '../Core.js';
import LineManager from '../LineManager.js';

export default class LineManagerTest {
  static enqueue(_) {
    _.Class('LineManager', () => {
      _.method('#constructor', () => {
        _.context('When creating a line manager', () => {
          const core = 'core';
          const subject = new LineManager({ core });

          _.assert(
            'It initializes each property',
            () => subject.core === core,
          );
        });
      });
    });
  }
}
