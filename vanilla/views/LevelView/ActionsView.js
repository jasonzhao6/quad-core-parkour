export default class ActionsView {
  constructor(_) {
    // Props
    this._ = _;
  }

  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() { // eslint-disable-line class-methods-use-this, TODO
    const boxConfig = { label: 'Actions:', labelStyle: 'text-align: left;' };
    return {
      speedButton: this._.renderBox({}, `
        <div class='ActionsView-Speed flexCenter'>100x</div>
      `, this.view()),
      startButton: this._.renderBox({}, `
        <div class='ActionsView-Start flexCenter'>Start</div>
      `, this.view()),
      stepButton: this._.renderBox({}, `
        <div class='ActionsView-Step flexCenter'>Step</div>
      `, this.view()),
      stopButton: this._.renderBox(boxConfig, `
        <div class='ActionsView-Stop flexCenter'>Stop</div>
      `, this.view()),
    };
  }

  render() {
    return this._.render(`
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
