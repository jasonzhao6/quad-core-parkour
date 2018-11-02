export default class ModesView {
  constructor(_) {
    // Props
    this._ = _;
  }

  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() { // eslint-disable-line class-methods-use-this, TODO
    const boxConfig = { label: 'Modes:', labelStyle: 'text-align: left;' };
    return {
      demoMode: this._.renderBox(boxConfig, `
        <div class='ModesView-Demo --center'>Demo</div>
      `, this.view()),
      easyMode: this._.renderBox({}, `
        <div class='ModesView-Easy --center'>Easy</div>
      `, this.view()),
      imageMode: this._.renderBox({}, `
        <div class='ModesView-Image --center'>Image</div>
      `, this.view()),
      stackMode: this._.renderBox({}, `
        <div class='ModesView-Stack --center'>Mem</div>
      `, this.view()),
    };
  }

  render() {
    return this._.render(`
      <div class='ModesView'>
        <ol class='--horizontalJustify'>
          <li>{{>demoMode}}</li>
          <li>{{>easyMode}}</li>
          <li>{{>stackMode}}</li>
          <li>{{>imageMode}}</li>
        </ol>
      </div>
    `, this.view(), this.partials());
  }
}
