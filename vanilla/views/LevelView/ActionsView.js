export default class ActionsView {
  constructor(_) {
    // Props
    this._ = _;
  }

  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() {
    const boxConfig = { label: 'Actions:', labelStyle: 'text-align: left;' };
    return {
      speedButton: this._.renderBox({}, `
        <div class='--button --center'>100x</div>
      `, this.view()),
      startButton: this._.renderBox({}, `
        <div class='--button --center'>Start</div>
      `, this.view()),
      stepButton: this._.renderBox({}, `
        <div class='--button --center'>Step</div>
      `, this.view()),
      stopButton: this._.renderBox(boxConfig, `
        <div class='--button --center'>Stop</div>
      `, this.view()),
    };
  }

  render() {
    return this._.render(`
      <div class='ActionsView --horizontalJustify'>
        {{>stopButton}}
        {{>startButton}}
        {{>stepButton}}
        {{>speedButton}}
      </div>
    `, this.view(), this.partials());
  }
}
