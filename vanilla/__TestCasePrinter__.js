export default class TestCasePrinter {
  constructor(failures) {
    // Format: [[className, methodName, contextString, assertionString], ...].
    this.failures = failures;

    this.lastClassName = null;
    this.lastMethodName = null;
    this.lastContextString = null;
  }

  print() {
    this.failures.forEach((failure) => {
      const [className, methodName, contextString, assertionString] = failure;
      this.printClassName(className);
      this.printMethodName(methodName);
      this.printContextString(contextString);
      TestCasePrinter.printAssertionString(assertionString);
    });

    this.closeLastClass();
  }

  //
  // Private
  //

  printClassName(className) {
    if (this.lastClassName !== className) {
      if (this.lastClassName !== null) this.closeLastClass();
      this.lastClassName = className;
      console.group(className); // eslint-disable-line
    }
  }

  printMethodName(methodName) {
    if (this.lastMethodName !== methodName) {
      if (this.lastMethodName !== null) this.closeLastMethod();
      this.lastMethodName = methodName;
      console.group(methodName); // eslint-disable-line
    }
  }

  printContextString(contextString) {
    if (this.lastContextString !== contextString) {
      if (this.lastContextString !== null) this.closeLastContext();
      this.lastContextString = contextString;
      console.group(contextString); // eslint-disable-line
    }
  }

  static printAssertionString(assertionString) {
    console.info(assertionString); // eslint-disable-line
  }

  closeLastClass() {
    this.closeLastMethod();
    this.lastClassName = null;
    console.groupEnd(); // eslint-disable-line
  }

  closeLastMethod() {
    this.closeLastContext();
    this.lastMethodName = null;
    console.groupEnd(); // eslint-disable-line
  }

  closeLastContext() {
    this.lastContextString = null;
    console.groupEnd(); // eslint-disable-line
  }
}
