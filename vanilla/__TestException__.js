export default class TestException {
  static get TYPES() {
    return {
      ARG: 'Unexpected argument',
      CHAIN: 'Broken method chain',
      VERIFY: 'Method not in instance',
    };
  }

  constructor({ type, message, inspect }, consoleOverride) {
    (consoleOverride || console).error('Stack trace');

    // Props
    this.type = type;
    this.message = message;
    if (inspect !== undefined) this.inspect = inspect;
  }
}
