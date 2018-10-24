import Escrow from '../Escrow.js';

export default class EscrowTest {
  static enqueue(_) {
    _.Class('Escrow', () => {
      _.method('#constructor', () => {
        const escrow = new Escrow();

        _.assert(
          'It initializes the `messages` state, a hash that defaults to `null`',
          () => [
            escrow.messages instanceof Object,
            escrow.messages.anything === null,
          ],
        );
      });

      _.method('#deposit', () => {
        const sender = 'sender';
        const recipient = 'recipient';
        const message = 'message';

        const key = Escrow.makeKey(sender, recipient);

        _.context('When there is no message for sender/recipient pair', () => {
          const escrow = new Escrow();
          const returnValue = escrow.deposit(sender, recipient, message);

          _.assert(
            'It deposits the message',
            () => escrow.messages[key] === message,
          );

          _.assert(
            'It returns `true`',
            () => returnValue === true,
          );
        });

        _.context('When there is message for sender/recipient pair', () => {
          const escrow = new Escrow();
          escrow.deposit(sender, recipient, 'existing message');
          const returnValue = escrow.deposit(sender, recipient, message);

          _.assert(
            'It does not deposit the message',
            () => escrow.messages[key] !== message,
          );

          _.assert(
            'It returns `false`',
            () => returnValue === false,
          );
        });
      });

      _.method('#withdraw', () => {
        const sender = 'sender';
        const recipient = 'recipient';
        const message = 'message';

        const key = Escrow.makeKey(sender, recipient);

        _.context('When there is no message for sender/recipient pair', () => {
          const escrow = new Escrow();
          const returnValue = escrow.withdraw(sender, recipient);

          _.assert(
            'It sets the message to null',
            () => escrow.messages[key] === null,
          );

          _.assert(
            'It returns `null`',
            () => returnValue === null,
          );
        });

        _.context('When there is message for sender/recipient pair', () => {
          const escrow = new Escrow();
          escrow.deposit(sender, recipient, message);
          const returnValue = escrow.withdraw(sender, recipient);

          _.assert(
            'It sets the message to null',
            () => escrow.messages[key] === null,
          );

          _.assert(
            'It returns the message',
            () => returnValue === message,
          );
        });
      });

      _.method('#has', () => {
        const sender = 'sender';
        const recipient = 'recipient';
        const message = 'message';

        _.context('When there is no message for sender/recipient pair', () => {
          const escrow = new Escrow();
          const returnValue = escrow.has(sender, recipient);

          _.assert(
            'It returns `false`',
            () => returnValue === false,
          );
        });

        _.context('When there is message for sender/recipient pair', () => {
          const escrow = new Escrow();
          escrow.deposit(sender, recipient, message);
          const returnValue = escrow.has(sender, recipient);

          _.assert(
            'It returns `true`',
            () => returnValue === true,
          );
        });
      });
    });
  }
}
