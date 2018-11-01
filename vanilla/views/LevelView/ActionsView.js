import { ViewHelper as _ } from '../ViewHelper.js';

export default class ActionsView {
  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() { // eslint-disable-line class-methods-use-this, TODO
    const boxConfig = { label: 'Actions:', labelStyle: 'text-align:left;' };
    return {
      speedButton: _.renderBox({}, `
        <div class='ActionsView-Speed flexCenter'>100x</div>
      `, this.view()),
      startButton: _.renderBox({}, `
        <div class='ActionsView-Start flexCenter'>Start</div>
      `, this.view()),
      stepButton: _.renderBox({}, `
        <div class='ActionsView-Step flexCenter'>Step</div>
      `, this.view()),
      stopButton: _.renderBox(boxConfig, `
        <div class='ActionsView-Stop flexCenter'>Stop</div>
      `, this.view()),
    };
  }

  render() {
    return _.render(`
      <div class='ActionsView'>
        <ol class='flexRow'>
          <li>{{>stopButton}}</li>
          <li>{{>startButton}}</li>
          <li>{{>stepButton}}</li>
          <li>{{>speedButton}}</li>
        </ol>
      </div>
    `, this.view(), this.partials());
  }
}
