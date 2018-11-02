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
        <div class='--button --center'>Demo</div>
      `, this.view()),
      easyMode: this._.renderBox({}, `
        <div class='--button --center'>Easy</div>
      `, this.view()),
      imageMode: this._.renderBox({}, `
        <div class='--button --center --disabled'>Image</div>
      `, this.view()),
      stackMode: this._.renderBox({}, `
        <div class='--button --center'>Mem</div>
      `, this.view()),
    };
  }

  render() {
    return this._.render(`
      <div class='ModesView --horizontalJustify'>
        {{>demoMode}}
        {{>easyMode}}
        {{>stackMode}}
        {{>imageMode}}
      </div>
    `, this.view(), this.partials());
  }
}
