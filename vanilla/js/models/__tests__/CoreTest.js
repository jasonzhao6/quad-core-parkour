import Core from '../Core.js';
import LineWorker from '../LineWorker.js';
import LineManager from '../LineManager.js';

export default class CoreTest {
  static enqueue(_) {
    _.Class('Core', () => {
      _.method('#constructor', () => {
        _.context('When creating a core', () => {
          const director = 'director';
          const subject = new Core({ director });

          _.assert(
            'It initializes each property',
            () => subject.director === director,
          );

          _.assert(
            'It initializes `accumulator` state to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          _.assert(
            'It initializes `backup` state to default value',
            () => subject.backup === Core.DEFAULT_VALUE,
          );
        });

        _.context('When creating a core without worker override', () => {
          const subject = new Core();

          _.assert(
            'It initializes the `worker` property',
            () => subject.worker instanceof LineWorker,
          );
        });

        _.context('When creating a core with worker override', () => {
          const lineWorkerOverride = 'lineWorkerOverride';
          const subject = new Core({ lineWorkerOverride });

          _.assert(
            'It initializes the `worker` property with override',
            () => subject.worker === lineWorkerOverride,
          );
        });

        _.context('When creating a core without line manager override', () => {
          const subject = new Core();

          _.assert(
            'It initializes the `manager` property',
            () => subject.manager instanceof LineManager,
          );
        });

        _.context('When creating a core with line manager override', () => {
          const lineManagerOverride = _.echo();
          const subject = new Core({ lineManagerOverride });

          _.assert(
            'It initializes the `manager` property with override',
            () => subject.manager === lineManagerOverride,
          );
        });
      });
    });

    _.Class('Core, delegated direction methods', () => {
      const director = _.echo();
      const subject = new Core({ director });

      _.method('#up', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.up() === subject.director.up(),
        );
      });

      _.method('#down', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.down() === subject.director.down(),
        );
      });

      _.method('#left', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.left() === subject.director.left(),
        );
      });

      _.method('#right', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.right() === subject.director.right(),
        );
      });
    });

    _.Class('Core, delegated messaging methods', () => {
      const director = _.echo();
      const subject = new Core({ director });
      const [direction, message] = ['direction', 'message'];

      _.method('#canSend', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.canSend(direction) ===
            subject.director.canSend(direction),
        );
      });

      _.method('#canReceive', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.canReceive(direction) ===
            subject.director.canReceive(direction),
        );
      });

      _.method('#send', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.send(direction, message) ===
            subject.director.send(direction, message),
        );
      });

      _.method('#receive', () => {
        _.assert(
          'It delegates to the `director`',
          () => subject.receive(direction) ===
            subject.director.receive(direction),
        );
      });
    });

    _.Class('Core, delegated commands', () => {
      const workerOverride = _.echo();
      const subject = new Core({ workerOverride });
      const [source, destination] = ['source', 'destination'];

      _.method('#move', () => {
        _.assert(
          'It delegates to the `worker`',
          () => subject.move(source, destination) ===
            subject.worker.move(source, destination),
        );
      });
    });

    _.Class('Core, delegated manage-work methods', () => {
      const lineManagerOverride = _.echo();
      const subject = new Core({ lineManagerOverride });
      const argument = 'argument';

      _.method('#loadLines', () => {
        _.assert(
          'It delegates to the `manager`',
          () => [
            subject.loadLines() === subject.manager.loadLines(),
            subject.loadLines(argument) === subject.manager.loadLines(argument),
          ],
        );
      });

      _.method('#nextLine', () => {
        _.assert(
          'It delegates to the `manager`',
          () => [
            subject.nextLine() === subject.manager.nextLine(),
            subject.nextLine(argument) === subject.manager.nextLine(argument),
          ],
        );
      });
    });
  }
}
