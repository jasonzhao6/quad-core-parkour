export default class TestCasePrinter {
  constructor(failures) {
    this.failures = failures; // [[klassName, methodName, etc], ...].

    this.lastKlassName = null;
    this.lastMethodName = null;
    this.lastContextString = null;
  }

  print() {
    this.failures.forEach((failure) => {
      const [klassName, methodName, contextString, assertionString] = failure;
      this.printKlassName(klassName);
      this.printMethodName(methodName);
      this.printContextString(contextString);
      TestCasePrinter.printAssertionString(assertionString);
    });

    this.closeLastModule();
  }

  //
  // Private
  //

  printKlassName(klassName) {
    if (this.lastKlassName !== klassName) {
      if (this.lastKlassName !== null) this.closeLastModule();
      this.lastKlassName = klassName;
      console.group(klassName); // eslint-disable-line
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
    this.lastKlassName = null;
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
