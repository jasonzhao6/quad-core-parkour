import LineWorker from './LineWorker.js';
import LineManager from './LineManager.js';

export default class Core {
  static get DEFAULT_VALUE() { return 0; }

  constructor({ lineManagerOverride, lineWorkerOverride, director } = {}) {
    // Props
    this.manager = lineManagerOverride || new LineManager({ core: this });
    this.worker = lineWorkerOverride || new LineWorker({ core: this });
    this.director = director;

    // States
    this.accumulator = Core.DEFAULT_VALUE;
    this.backup = Core.DEFAULT_VALUE;
  }

  //
  // Delegated
  //

  // Manage work via `manager`
  loadLines(lines) { return this.manager.loadLines(lines); }
  nextLine(redoPrevious) { return this.manager.nextLine(redoPrevious); }

  // Do work via `worker`
  move(source, destination) { return this.worker.move(source, destination); }

  // Get name via `director`
  name() { return this.director.name(); }

  // Get directions via `director`
  get up() { return this.director.up; }
  get down() { return this.director.down; }
  get left() { return this.director.left; }
  get right() { return this.director.right; }

  // Send/receive messages via `director`
  canSend(direction) { return this.director.canSend(direction); }
  canReceive(direction) { return this.director.canReceive(direction); }
  send(direction, message) { return this.director.send(direction, message); }
  receive(direction) { return this.director.receive(direction); }
}
