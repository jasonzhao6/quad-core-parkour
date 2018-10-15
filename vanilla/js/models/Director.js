export default class Director {
  static isDirection(direction) {
    return ['up', 'down', 'left', 'right'].includes(direction);
  }

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

  // Arguments: [undefined] or [direction].
  name(direction) {
    // Return name of self.
    if (direction === undefined) return [this.i, this.j].join(':');

    // Return name of neighboring element.
    if (this[direction] !== null) return this[direction].director.name();

    // Return direction itself since it's out of bound that way.
    return direction;
  }

  //
  // Directions
  //

  get up() {
    if (this.i - 1 === -1) return null;
    return this.matrix.get(this.i - 1, this.j);
  }

  get down() {
    if (this.i + 1 === this.matrix.rowCount) return null;
    return this.matrix.get(this.i + 1, this.j);
  }

  get left() {
    if (this.j - 1 === -1) return null;
    return this.matrix.get(this.i, this.j - 1);
  }

  get right() {
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
}
