/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['has', 'compare'] }] */

import TestException from './__TestException__.js';

class TestHandler {
  // For each setup method, see its usage above its method definition.
  static get SETUP_METHODS() { return ['allowIt', 'expectIt', 'isAsExpected']; }
  static get MODES() { return { ALLOW: 'allow', EXPECT: 'expect' }; }
  static get GETTERS() { return { IS_PROXY: 'isProxy', DEBUGGER: 'debugger' }; }

  constructor(instance, consoleOverride) {
    // Props
    this.instance = instance;
    this.console = consoleOverride || console;

    // Current context
    this.currentMode = null; // Either MODES.ALLOW or MODES.EXPECT.
    this.currentMethod = null;

    // State
    this.expectations = {}; // { [method]: { callsActual: 0, etc }, ... }.
  }

  // A trap for the in operator.
  has(instance, method) {
    if (TestHandler.SETUP_METHODS.includes(method)) return true;
    if (Object.values(TestHandler.GETTERS).includes(method)) return true;

    return method in instance;
  }

  // A trap for getting property values.
  get(instance, method) {
    // Route setup methods
    if (TestHandler.SETUP_METHODS.includes(method)) {
      return this[method].bind(this);
    }

    // Route getters
    if (method === TestHandler.GETTERS.IS_PROXY) return true;
    // eslint-disable-next-line no-debugger
    if (method === TestHandler.GETTERS.DEBUGGER) debugger;

    // Route proxied methods
    if (method in this.expectations) {
      const expectation = this.expectations[method];

      return (...args) => {
        expectation.callsActual += 1;
        expectation.argsActual = args;

        return expectation.returnValue !== undefined
          ? expectation.returnValue
          : instance[method].call(instance, ...args);
      };
    }

    // Route original methods
    return instance[method];
  }

  //
  // Usage:
  //
  // ```
  //   proxy
  //     .allowIt()
  //     .toReceive(method)
  //     [.andReturn(response)]
  // ```
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
  // Usage:
  //
  // ```
  //   proxy
  //     .expectIt()
  //     .toHaveReceived(method)
  //     [.withArgs([arg1, arg2, etc])]
  //     [.nTimes(n)]`
  // ```
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

  withArgs(args) {
    this.verifyMode(TestHandler.MODES.EXPECT, 'withArgs');
    this.expectations[this.currentMethod].argsExpected = Array.of(args).flat();
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
        argsExpected === undefined || this.compare(argsExpected, argsActual),
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
    }, this.console);
  }

  verifyMethod(method) {
    if (method in this.instance) return;

    throw new TestException({
      type: TestException.TYPES.VERIFY,
      message: `${method}()`,
      inspect: this.instance,
    }, this.console);
  }

  compare(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }
}

export default class TestProxy {
  static echo() {
    if (this.echoSingleton === undefined) {
      this.echoSingleton = new Proxy({}, {
        get: (_instance, method) =>
          (...args) => [method, args].filter(String).join(),
      });
    }

    return this.echoSingleton;
  }

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
