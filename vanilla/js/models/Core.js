import Commander from './Commander.js';

export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor({ director }) {
    // Props
    this.director = director;
    this.commander = new Commander({ core: this });

    // States
    this.accumulator = Core.DEFAULT_VALUE;
    this.backup = Core.DEFAULT_VALUE;
  }

  //
  // Delegated
  //

  // Directions via `director`
  up() { return this.director.up(); }
  down() { return this.director.down(); }
  left() { return this.director.left(); }
  right() { return this.director.right(); }

  // Messaging via `director`
  canSend(direction) { return this.director.canSend(direction); }
  canReceive(direction) { return this.director.canReceive(direction); }
  send(direction, message) { return this.director.send(direction, message); }
  receive(direction) { return this.director.receive(direction); }

  // Commands via `commander`
  move(source, destination) { return this.commander.move(source, destination); }
}
