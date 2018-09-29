import TestException from './__TestException__.js';

class TestHandler {
  static get MODES() { return { ALLOW: 'allow', EXPECT: 'expect' }; }

  constructor(instance) {
    // Props
    this.instance = instance;

    // Current context
    this.currentMethod = null;
    this.currentMode = null; // Either MODES.ALLOW or MODES.EXPECT.

    // States
    this.expectations = {}; // { [method]: { callsActual: 0, etc }, ... }.
  }

  get(instance, method) {
    // Setup methods (See each method's comment for usage.)
    if (method === 'toReceive') return this.toReceive.bind(this);
    if (method === 'toHaveReceived') return this.toHaveReceived.bind(this);
    if (method === 'isAsExpected') return this.isAsExpected.bind(this);

    // Getters
    if (method === 'MODES') return TestHandler.MODES;
    if (method === 'isProxy') return true;
    if (method === 'debugger') debugger; // eslint-disable-line no-debugger

    // Proxy logic
    if (method in this.expectations) {
      this.expectations[method].callsActual += 1;

      if (this.expectations[method].returnValue !== undefined) {
        return () => this.expectations[method].returnValue;
      }
    }

    return instance[method];
  }

  //
  // Allow `proxy.toReiceive(method)[.andReturn(response)]`
  //

  toReceive(method) {
    this.verify(method);
    this.currentMethod = method;
    this.currentMode = TestHandler.MODES.ALLOW;
    this.expectations[method] = { callsActual: 0 };
    return this;
  }

  andReturn(value = null) {
    if (this.currentMode !== TestHandler.MODES.ALLOW) {
      throw new TestException({
        type: TestException.TYPES.CHAIN,
        message: 'Expected .toReiceive(method).andReturn(response)',
      });
    }

    this.expectations[this.currentMethod].returnValue = value;
    return this;
  }

  //
  // Expect `proxy.toHaveReceived(method)[.nTimes(n)]`
  //

  toHaveReceived(method) {
    this.verify(method);
    this.currentMethod = method;
    this.currentMode = TestHandler.MODES.EXPECT;
    this.expectations[method].callsExpected = 1;
    return this;
  }

  nTimes(n) {
    if (this.currentMode !== TestHandler.MODES.EXPECT) {
      throw new TestException({
        type: TestException.TYPES.CHAIN,
        message: 'Expected .toHaveReceived(method).nTimes(n)',
      });
    }

    this.expectations[this.currentMethod].callsExpected = n;
  }

  //
  // Assert `proxy.isAsExpected()`
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

  verify(method) {
    if (method in this.instance) return;

    throw new TestException({
      type: TestException.TYPES.VERIFY,
      message: `${method}()`,
      inspect: this.instance,
    });
  }
}

export default class TestProxy {
  constructor(instance) {
    return new Proxy(instance, new TestHandler(instance));
  }

  static noop() {
    if (this.noopSingleton === undefined) {
      this.noopSingleton = new Proxy({}, { get: () => () => {} });
    }

    return this.noopSingleton;
  }
}
