// TODO Documentation

class TestHandler {
  constructor() {
    // Format: { [method]: { callsExpected, callsActual, etc }, ... }.
    this.expectations = {};

    // This state is set by expect() and used by methods chained after it.
    this.currentMethod = null;
  }

  get(instance, method) {
    if (method === 'toReceive') return this.toReceive.bind(this);
    if (method === 'toHaveReceived') return this.toHaveReceived.bind(this);
    if (method === 'isAsExpected') return this.isAsExpected.bind(this);

    if (method in this.expectations) {
      this.expectations[method].callsActual += 1;

      if (this.expectations[method].returnValue) {
        return this.expectations[method].returnValue;
      }
    }

    return instance[method];
  }

  //
  // Proxied
  //

  toReceive(method) {
    this.currentMethod = method;
    this.expectations[method] = { callsActual: 0 }; // Initialize method hash
    return this;
  }

  toHaveReceived(method) {
    this.currentMethod = method;
    this.expectations[method].callsExpected = 1;
    return this;
  }

  isAsExpected() {
    return Object.values(this.expectations).every((methodExpectations) => {
      const { callsExpected, callsActual } = methodExpectations;
      const { argsExpected, argsActual } = methodExpectations;
      return [
        callsExpected === undefined || callsExpected === callsActual,
        argsExpected === undefined || argsExpected === argsActual,
      ].every(expectation => expectation === true);
    });
  }

  //
  // `.toReceive.[chainable]` / `.toHaveReceived.[chainable]`
  //

  // TODO Track actual args
  // toReceive(...args) {
  //   this.expectations[this.currentMethod].argsExpected = args;
  //   this.expectations[this.currentMethod].argsActual = null;
  //   return this;
  // }

  andReturn(value) {
    // Wrap return value in a function as the proxy handler takes a method name
    // and returns the corresponding function.
    this.expectations[this.currentMethod].returnValue = () => value;
    return this;
  }

  nTimes(n) {
    this.expectations[this.currentMethod].callsExpected = n;
  }
}

export default class TestProxy {
  constructor(instance) {
    instance.__TestProxyId__ = new Date().getTime(); // eslint-disable-line
    return new Proxy(instance, new TestHandler());
  }

  static noop() {
    if (this.noopSingleton === undefined) {
      this.noopSingleton = new Proxy({}, { get: () => () => {} });
    }

    return this.noopSingleton;
  }
}
