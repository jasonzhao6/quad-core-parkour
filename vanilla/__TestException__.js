/* eslint no-console: ['error', { allow: ['error'] }] */

export default class TestException {
  static get TYPES() {
    return {
      ARG: 'Unexpected argument', // E.g message 'Expected a ...'.
      CHAIN: 'Unexpected method chain', // E.g message 'Expected .foo().bar()'.
      VERIFY: 'Method not in instance', // E.g message 'foo()'.
    };
  }

  constructor({ type, message, inspect }) {
    console.error('Stack trace');

    // Props
    this.type = type;
    this.message = message;
    if (inspect !== undefined) this.inspect = inspect;
  }
}
