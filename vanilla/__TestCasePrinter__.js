/* global window */

export default class TestCasePrinter {
  constructor(failures, consoleOverride) {
    // Format: [[className, methodName, contextString, assertionString], ...].
    this.failures = failures;
    this.console = consoleOverride || window.console;

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
      this.printAssertionString(assertionString);
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
      this.console.group(className); // eslint-disable-line
    }
  }

  printMethodName(methodName) {
    if (this.lastMethodName !== methodName) {
      if (this.lastMethodName !== null) this.closeLastMethod();
      this.lastMethodName = methodName;
      this.console.group(methodName); // eslint-disable-line
    }
  }

  printContextString(contextString) {
    if (this.lastContextString !== contextString) {
      if (this.lastContextString !== null) this.closeLastContext();
      this.lastContextString = contextString;
      this.console.group(contextString); // eslint-disable-line
    }
  }

  printAssertionString(assertionString) {
    this.console.info(assertionString); // eslint-disable-line
  }

  closeLastClass() {
    this.closeLastMethod();
    this.lastClassName = null;
    this.console.groupEnd(); // eslint-disable-line
  }

  closeLastMethod() {
    this.closeLastContext();
    this.lastMethodName = null;
    this.console.groupEnd(); // eslint-disable-line
  }

  closeLastContext() {
    this.lastContextString = null;
    this.console.groupEnd(); // eslint-disable-line
  }
}
