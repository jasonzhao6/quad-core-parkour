// TODO Documentation, call toReceive first

class TestHandler {
  constructor(instance) {
    this.instance = instance;

    // Format: { [method]: { callsExpected, callsActual, etc }, ... }.
    this.expectations = {};

    // This state is set by expect() and used by methods chained after it.
    this.currentMethod = null;
  }

  get(instance, method) {
    // Proxying methods
    if (method === 'toReceive') return this.toReceive.bind(this);
    if (method === 'toHaveReceived') return this.toHaveReceived.bind(this);
    if (method === 'isAsExpected') return this.isAsExpected.bind(this);

    // Proxied methods
    if (method in this.expectations) {
      this.expectations[method].callsActual += 1;

      if (this.expectations[method].returnValue) {
        return this.expectations[method].returnValue;
      }
    }

    return instance[method];
  }

  //
  // Proxying
  //

  toReceive(method) {
    // Verify that method to proxy exists in the underlying instance.
    if (!(method in this.instance)) {
      // eslint-disable-next-line no-console
      console.error(`Not allowed to proxy '${method}' b/c it doesn't exist on`);
      throw this.instance;
    }

    // Set `currentMethod` for reference by chained methods.
    this.currentMethod = method;

    // Initialize method-specific hash, to be appended to by chained methods.
    this.expectations[method] = { callsActual: 0 };

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
  // Chained (to `.toReceive` and `.toHaveReceived`)
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
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    instance.__TestProxyId__ = new Date().getTime();
    return new Proxy(instance, new TestHandler(instance));
  }

  static noop() {
    if (this.noopSingleton === undefined) {
      this.noopSingleton = new Proxy({}, { get: () => () => {} });
    }

    return this.noopSingleton;
  }
}
