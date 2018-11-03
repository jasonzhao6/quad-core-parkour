export default class ModesView {
  constructor(_) {
    // Props
    this._ = _;
  }

  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() {
    const demoConfig = { viewClass: 'demoMode --button' };
    const debugConfig = { viewClass: 'debugMode --button active' };
    const imageConfig = { viewClass: 'imageMode --button disabled' };
    const stackConfig = { viewClass: 'stackMode --button' };

    // Label row via the first box
    demoConfig.label = 'Modes:';
    demoConfig.labelStyle = 'text-align: left;';

    const demoTemplate = `<div class='label --center'>Demo</div>`;
    const debugTemplate = `<div class='label --center'>Easy</div>`;
    const imageTemplate = `<div class='label --center'>Image</div>`;
    const stackTemplate = `<div class='label --center'>Mem</div>`;

    return {
      demoMode: this._.renderBox(demoConfig, demoTemplate, this.view()),
      debugMode: this._.renderBox(debugConfig, debugTemplate, this.view()),
      imageMode: this._.renderBox(imageConfig, imageTemplate, this.view()),
      stackMode: this._.renderBox(stackConfig, stackTemplate, this.view()),
    };
  }

  render() {
    return this._.render(`
      <div class='ModesView --horizontalJustify'>
        {{>demoMode}}
        {{>debugMode}}
        {{>stackMode}}
        {{>imageMode}}
      </div>
    `, this.view(), this.partials());
  }
}
