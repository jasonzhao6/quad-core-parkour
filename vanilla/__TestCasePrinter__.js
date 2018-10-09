export default class TestCasePrinter {
  constructor(failures, consoleOverride) {
    // Props
    this.failures = failures; // [[class, method, context, assertion], ...].
    this.console = consoleOverride || console;

    // States
    this.lastClass = null;
    this.lastMethod = null;
    this.lastContext = null;
  }

  print() {
    this.failures.forEach((failure) => {
      const [
        currentClass,
        currentMethod,
        currentContext,
        currentAssertion,
      ] = failure;

      this.printClassName(currentClass);
      this.printMethodName(currentMethod);
      this.printContextString(currentContext);
      this.printAssertionString(currentAssertion);
    });

    this.closeLastClass();
  }

  //
  // Private
  //

  printClassName(currentClass) {
    if (this.lastClass === currentClass) return;
    if (this.lastClass !== null) this.closeLastClass();
    if (currentClass === null) return;

    this.lastClass = currentClass;
    this.console.group(currentClass);
  }

  printMethodName(currentMethod) {
    if (this.lastMethod === currentMethod) return;
    if (this.lastMethod !== null) this.closeLastMethod();
    if (currentMethod === null) return;

    this.lastMethod = currentMethod;
    this.console.group(currentMethod);
  }

  printContextString(currentContext) {
    if (this.lastContext === currentContext) return;
    if (this.lastContext !== null) this.closeLastContext();
    if (currentContext === null) return;

    this.lastContext = currentContext;
    this.console.group(currentContext);
  }

  printAssertionString(currentAssertion) {
    this.console.info(currentAssertion);
  }

  closeLastClass() {
    this.closeLastMethod();

    if (this.lastClass === null) return;

    this.lastClass = null;
    this.console.groupEnd();
  }

  closeLastMethod() {
    this.closeLastContext();

    if (this.lastMethod === null) return;

    this.lastMethod = null;
    this.console.groupEnd();
  }

  closeLastContext() {
    if (this.lastContext === null) return;

    this.lastContext = null;
    this.console.groupEnd();
  }
}
