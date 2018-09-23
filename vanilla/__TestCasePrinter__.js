export default class TestCasePrinter {
  constructor(failures) {
    this.failures = failures; // [[moduleName, methodName, etc], ...].

    this.lastModuleName = null;
    this.lastMethodName = null;
    this.lastContextString = null;
  }

  print() {
    this.failures.forEach((failure) => {
      const [moduleName, methodName, contextString, assertionString] = failure;
      this.printModuleName(moduleName);
      this.printMethodName(methodName);
      this.printContextString(contextString);
      TestCasePrinter.printAssertionString(assertionString);
    });

    this.closeLastModule();
  }

  //
  // Private
  //

  printModuleName(moduleName) {
    if (this.lastModuleName !== moduleName) {
      if (this.lastModuleName !== null) this.closeLastModule();
      this.lastModuleName = moduleName;
      console.group(moduleName); // eslint-disable-line
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

  closeLastModule() {
    this.closeLastMethod();
    this.lastModuleName = null;
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
