/* eslint no-console: ['error', { allow: ['error'] }] */

export default class TestException {
  // Exception types
  static get ARG() { return 'Unexpected argument'; }
  static get CHAIN() { return 'Unexpected method chain'; }

  constructor({ type, message, argument }) {
    if (type !== undefined) this.type = type;
    if (argument !== undefined) this.argument = argument;

    console.error(message);
  }
}
