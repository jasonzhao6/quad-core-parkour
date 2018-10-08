// Escrow for holding message between sender and recipient.
// Allow only one message at a time per sender/recipient pair.
export default class Escrow {
  constructor() {
    // Set default value to `null`.
    this.messages = new Proxy({}, {
      get: (instance, method) => (method in instance ? instance[method] : null),
    });
  }

  // Deposit message if there is no existing message for sender/recipient pair.
  // Return boolean indicating whether deposit was successful.
  deposit(sender, recipient, message) {
    const key = Escrow.makeKey(sender, recipient);

    if (this.messages[key] === null) {
      this.messages[key] = message;
      return true;
    }

    return false;
  }

  // Withdraw and clear message for sender/recipient pair.
  // Return the withdrawn message or `null`.
  withdraw(sender, recipient) {
    const key = Escrow.makeKey(sender, recipient);
    const message = this.messages[key];
    this.messages[key] = null;
    return message;
  }

  //
  // Private
  //

  // Peek at message for sender/recipient pair without clearing it.
  // Return the withdrawn message or `null`.
  peek(sender, recipient) {
    return this.messages[Escrow.makeKey(sender, recipient)];
  }

  static makeKey(sender, recipient) {
    return [sender, recipient].join('-');
  }
}
