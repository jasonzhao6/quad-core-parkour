// TODO Documentation

class TestHandler {
  constructor() {
    // Format: { [method]: { callsExpected, callsActual, etc }, ... }.
    this.expectations = {};

    // This state is set by expect() and used by methods chained after it.
    this.currentMethod = null;
  }

  get(instance, method) {
    if (method === 'expectMethod') return this.expectMethod.bind(this);
    if (method === 'asExpected') return this.asExpected.bind(this);

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

  expectMethod(method) {
    this.currentMethod = method;
    this.expectations[method] = {
      callsExpected: 1,
      callsActual: 0,
    };
    return this;
  }

  asExpected() {
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
  // `.expect.[chainable]`
  //

  // TODO Track actual args
  // toReceive(...args) {
  //   this.expectations[this.currentMethod].argsExpected = args;
  //   this.expectations[this.currentMethod].argsActual = null;
  //   return this;
  // }

  andReturn(value) {
    this.expectations[this.currentMethod].returnValue = () => value;
    return this;
  }

  nTimes(n) {
    this.expectations[this.currentMethod].callsExpected = n;
  }
}

export default class TestProxy {
  constructor(instance) {
    return new Proxy(instance, new TestHandler());
  }

  static noop() {
    return new Proxy({}, { get: () => () => {} });
  }
}
