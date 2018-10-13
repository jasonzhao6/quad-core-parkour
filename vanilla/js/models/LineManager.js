export default class LineManager {
  constructor({ core, sourceCode = [] } = {}) {
    // Props
    this.core = core;
    this.sourceCode = sourceCode;
  }

  * lines() {
    for (let i = 0; i < Infinity; i += 1) {
      const lastResult = yield this.sourceCode[i % this.sourceCode.length];
      if (lastResult === false) i -= 1;
    }
  }
}
