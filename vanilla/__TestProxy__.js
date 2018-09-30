import TestException from './__TestException__.js';

class TestHandler {
  static get MODES() { return { ALLOW: 'allow', EXPECT: 'expect' }; }

  constructor(instance) {
    // Props
    this.instance = instance;

    // Current context
    this.currentMode = null; // Either MODES.ALLOW or MODES.EXPECT.
    this.currentMethod = null;

    // States
    this.expectations = {}; // { [method]: { callsActual: 0, etc }, ... }.
  }

  get(instance, method) {
    // Setup methods (See each method's comment for usage.)
    if (method === 'allowIt') return this.allowIt.bind(this);
    if (method === 'expectIt') return this.expectIt.bind(this);
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
  // `proxy.allowIt().toReceive(method)[.andReturn(response)]`
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
  // `proxy.expectIt().toHaveReceived(method)[.nTimes(n)]`
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
  constructor(instance) {
    return new Proxy(instance, new TestHandler(instance));
  }

  static verify(instance) {
    if (instance.isProxy) return;

    throw new TestException({
      type: TestException.TYPES.ARG,
      message: 'Expected a proxy',
      inspect: instance,
    });
  }

  static noop() {
    if (this.noopSingleton === undefined) {
      this.noopSingleton = new Proxy({}, { get: () => () => {} });
    }

    return this.noopSingleton;
  }
}
