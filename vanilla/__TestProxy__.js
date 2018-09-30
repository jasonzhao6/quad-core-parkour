/* eslint class-methods-use-this: ['error', { exceptMethods: ['has'] }] */

import TestException from './__TestException__.js';

class TestHandler {
  static get SETUP_METHODS() {
    return { // See usage above each method's definition.
      ALLOW_IT: 'allowIt',
      EXPECT_IT: 'expectIt',
      IS_AS_EXPECTED: 'isAsExpected',
    };
  }
  static get MODES() { return { ALLOW: 'allow', EXPECT: 'expect' }; }
  static get GETTERS() { return { IS_PROXY: 'isProxy', DEBUGGER: 'debugger' }; }

  constructor(instance, consoleOverride) {
    // Props
    this.instance = instance;
    this.console = consoleOverride || console;

    // Current context
    this.currentMode = null; // Either MODES.ALLOW or MODES.EXPECT.
    this.currentMethod = null;

    // States
    this.expectations = {}; // { [method]: { callsActual: 0, etc }, ... }.
  }

  has(instance, method) {
    if (Object.values(TestHandler.SETUP_METHODS).includes(method)) return true;
    if (Object.values(TestHandler.GETTERS).includes(method)) return true;

    return method in instance;
  }

  get(instance, method) {
    // Route setup methods
    if (Object.values(TestHandler.SETUP_METHODS).includes(method)) {
      return this[method].bind(this);
    }

    // Route getters
    if (method === TestHandler.GETTERS.IS_PROXY) return true;
    // eslint-disable-next-line no-debugger
    if (method === TestHandler.GETTERS.DEBUGGER) debugger;

    // Route proxied methods
    if (method in this.expectations) {
      this.expectations[method].callsActual += 1;

      if (this.expectations[method].returnValue !== undefined) {
        return () => this.expectations[method].returnValue;
      }
    }

    // Route original methods
    return instance[method];
  }

  //
  // Usage: `proxy.allowIt().toReceive(method)[.andReturn(response)]`
  //

  allowIt() {
    this.currentMode = TestHandler.MODES.ALLOW;
    return this;
  }

  toReceive(method) {
    this.verifyMode(TestHandler.MODES.ALLOW, 'toReceive');
    this.verifyMethod(method);
    this.currentMethod = method;
    this.expectations[method] = { callsActual: 0 };
    return this;
  }

  andReturn(value = null) {
    this.verifyMode(TestHandler.MODES.ALLOW, 'andReturn');
    this.expectations[this.currentMethod].returnValue = value;
  }

  //
  // Usage: `proxy.expectIt().toHaveReceived(method)[.nTimes(n)]`
  //

  expectIt() {
    this.currentMode = TestHandler.MODES.EXPECT;
    return this;
  }

  toHaveReceived(method) {
    this.verifyMode(TestHandler.MODES.EXPECT, 'toHaveReceived');
    this.verifyMethod(method);
    this.currentMethod = method;
    this.expectations[method].callsExpected = 1;
    return this;
  }

  nTimes(n) {
    this.verifyMode(TestHandler.MODES.EXPECT, 'nTimes');
    this.expectations[this.currentMethod].callsExpected = n;
  }

  //
  // Usage: Assert `proxy.isAsExpected()`
  //

  isAsExpected() {
    return Object.values(this.expectations).map((methodExpectations) => {
      const { callsExpected, callsActual } = methodExpectations;
      const { argsExpected, argsActual } = methodExpectations;

      return [
        callsExpected === undefined || callsExpected === callsActual,
        argsExpected === undefined || argsExpected === argsActual,
      ].every(expectation => expectation === true);
    });
  }

  //
  // Private
  //

  verifyMode(mode, method) {
    if (this.currentMode === mode) return;

    throw new TestException({
      type: TestException.TYPES.CHAIN,
      message: `Cannot call ${method}() in '${this.currentMode}' mode`,
    });
  }

  verifyMethod(method) {
    if (method in this.instance) return;

    throw new TestException({
      type: TestException.TYPES.VERIFY,
      message: `${method}()`,
      inspect: this.instance,
    });
  }
}

export default class TestProxy {
  static noop() {
    if (this.noopSingleton === undefined) {
      this.noopSingleton = new Proxy({}, { get: () => () => {} });
    }

    return this.noopSingleton;
  }

  static verify(instance, consoleOverride) {
    if (instance && instance.isProxy) return;

    throw new TestException({
      type: TestException.TYPES.ARG,
      message: 'Expected a proxy',
      inspect: instance,
    }, consoleOverride);
  }

  constructor(instance, consoleOverride) {
    return new Proxy(instance, new TestHandler(instance, consoleOverride));
  }
}
