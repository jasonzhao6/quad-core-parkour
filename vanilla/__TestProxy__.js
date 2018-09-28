/* eslint class-methods-use-this: ['error', { exceptMethods: ['debug'] }] */
/* eslint no-console: ['error', { allow: ['error'] }] */

class TestHandler {
  constructor(instance) {
    this.instance = instance;
    this.currentMethod = null;
    this.expectations = {}; // { [method]: { callsActual: 0, etc }, ... }.
  }

  get(instance, method) {
    // Handler methods
    if (method === 'isProxy') return true;
    if (method === 'debug') return this.debug.bind(this);
    if (method === 'toReceive') return this.toReceive.bind(this);
    if (method === 'toHaveReceived') return this.toHaveReceived.bind(this);
    if (method === 'isAsExpected') return this.isAsExpected.bind(this);

    // Proxied methods
    if (method in this.expectations) {
      this.expectations[method].callsActual += 1;

      if (this.expectations[method].returnValue !== undefined) {
        return () => this.expectations[method].returnValue;
      }
    }

    return instance[method];
  }

  debug() {
    debugger; // eslint-disable-line no-debugger
  }

  //
  // Allow `proxy.toReiceive(method)[.andReturn(response)]`
  //

  toReceive(method) {
    this.verify(method);
    this.currentMethod = method;
    this.expectations[method] = { callsActual: 0 };
    return this;
  }

  andReturn(value = null) {
    this.expectations[this.currentMethod].returnValue = value;
    return this;
  }

  //
  // Expect `proxy.toHaveReceived(method)[.nTimes(n)]`
  //

  toHaveReceived(method) {
    this.verify(method);
    this.currentMethod = method;
    this.expectations[method].callsExpected = 1;
    return this;
  }

  nTimes(n) {
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

    console.error(`Not allowed to proxy '${method}' method b/c it's not in:`);
    throw this.instance;
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
