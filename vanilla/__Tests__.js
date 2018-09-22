import MatrixTest from './js/models/__tests__/MatrixTest.js';

export default class Tests {
  static run(th) {
    this.runModelTests(th);

    th.executeAssertions();
  }

  static runModelTests(th) {
    MatrixTest.run(th);
  }
}
