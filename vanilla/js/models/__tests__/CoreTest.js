import Core from '../Core.js';
import Commander from '../Commander.js';
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

        _.context('When creating a core without commander override', () => {
          const subject = new Core();

          _.assert(
            'It initializes the `commander` property',
            () => subject.commander instanceof Commander,
          );
        });

        _.context('When creating a core with commander override', () => {
          const commanderOverride = 'commanderOverride';
          const subject = new Core({ commanderOverride });

          _.assert(
            'It initializes the `commander` property with override',
            () => subject.commander === commanderOverride,
          );
        });

        _.context('When creating a core without line manager override', () => {
          const subject = new Core();

          _.assert(
            'It initializes the `lineManager` property',
            () => subject.lineManager instanceof LineManager,
          );

          _.assert(
            'It initializes `lines` state to a generator',
            () => [
              subject.lines.next().value === undefined,
              subject.lines.next().done === false,
            ],
          );
        });

        _.context('When creating a core with line manager override', () => {
          const lineManagerOverride = _.echo();
          const subject = new Core({ lineManagerOverride });

          _.assert(
            'It initializes the `lineManager` property with override',
            () => subject.lineManager === lineManagerOverride,
          );

          _.assert(
            'It initializes `lines` state to default value',
            () => subject.accumulator === Core.DEFAULT_VALUE,
          );

          _.assert(
            'It initializes `lines` state',
            () => [
              subject.lines === 'lines',
            ],
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
      const commanderOverride = _.echo();
      const subject = new Core({ commanderOverride });
      const [source, destination] = ['source', 'destination'];

      _.method('#move', () => {
        _.assert(
          'It delegates to the `commander`',
          () => subject.move(source, destination) ===
            subject.commander.move(source, destination),
        );
      });
    });
  }
}
