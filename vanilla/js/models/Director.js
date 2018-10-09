export default class Director {
  static reverse(direction) {
    if (direction === 'up') return 'down';
    if (direction === 'down') return 'up';
    if (direction === 'left') return 'right';

    // ... if (direction === 'right')
    return 'left';
  }

  constructor({ i, j, matrix }) {
    // Props
    this.i = i;
    this.j = j;
    this.matrix = matrix;
    this.escrow = this.matrix.escrow;

    // Name the current element
    this.matrix.alias(i, j, this.name());
  }

  //
  // Directions
  //

  up() {
    if (this.i - 1 === -1) return null;
    return this.matrix.get(this.i - 1, this.j);
  }

  down() {
    if (this.i + 1 === this.matrix.rowCount) return null;
    return this.matrix.get(this.i + 1, this.j);
  }

  left() {
    if (this.j - 1 === -1) return null;
    return this.matrix.get(this.i, this.j - 1);
  }

  right() {
    if (this.j + 1 === this.matrix.columnCount) return null;
    return this.matrix.get(this.i, this.j + 1);
  }

  //
  // Messaging
  //

  canSend(direction) {
    const sender = this.name();
    const recipient = this.name(direction);
    return !this.escrow.has(sender, recipient);
  }

  canReceive(direction) {
    const sender = this.name(direction);
    const recipient = this.name();
    return this.escrow.has(sender, recipient);
  }

  send(direction, message) {
    const sender = this.name();
    const recipient = this.name(direction);
    return this.escrow.deposit(sender, recipient, message);
  }

  receive(direction) {
    const sender = this.name(direction);
    const recipient = this.name();
    return this.escrow.withdraw(sender, recipient);
  }

  //
  // Private
  //

  // Arguments: [undefined] or [direction].
  name(direction) {
    if (direction === undefined) {
      // Note: This naming scheme is specifically meant for a 2x2 matrix.
      return [this.i, this.j].join('').replace(/0/g, 'o').replace(/1/g, 'i');
    }

    return this[direction]() !== null
      ? this[direction]().director.name()
      : direction;
  }
}
