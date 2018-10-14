// Escrow for holding message between sender and recipient.
// Allow only one message at a time per sender/recipient pair.
export default class Escrow {
  constructor() {
    // Set all default values to `null`.
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

  // Checks if there exists a message for sender/recipient pair.
  // Returns `true` or `false`.
  has(sender, recipient) {
    return this.messages[Escrow.makeKey(sender, recipient)] !== null;
  }

  //
  // Private
  //

  static makeKey(sender, recipient) {
    return [sender, recipient].join('->');
  }
}
