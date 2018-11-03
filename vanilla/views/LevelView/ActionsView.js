import { singleton as _ } from '../ViewHelper.js';

export default class ActionsView {
  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() {
    const boxConfig = { label: 'Actions:', labelStyle: 'text-align: left;' };
    return {
      speedButton: _.renderBox({}, `
        <div class='--button --center'>100x</div>
      `, this.view()),
      startButton: _.renderBox({}, `
        <div class='--button --center'>Start</div>
      `, this.view()),
      stepButton: _.renderBox({}, `
        <div class='--button --center'>Step</div>
      `, this.view()),
      stopButton: _.renderBox(boxConfig, `
        <div class='--button --center'>Stop</div>
      `, this.view()),
    };
  }

  render() {
    return _.render(`
      <div class='ActionsView --horizontalJustify'>
        {{>stopButton}}
        {{>startButton}}
        {{>stepButton}}
        {{>speedButton}}
      </div>
    `, this.view(), this.partials());
  }
}
