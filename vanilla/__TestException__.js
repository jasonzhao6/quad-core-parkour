/* eslint no-console: ['error', { allow: ['error'] }] */

export default class TestException {
  static get TYPES() {
    return {
      ARG: 'Unexpected argument',
      CHAIN: 'Unexpected method chain',
    };
  }

  constructor({ type, message, argument }) {
    if (type !== undefined) this.type = type;
    if (argument !== undefined) this.argument = argument;

    console.error(message);
  }
}
