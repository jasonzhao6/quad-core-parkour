import { singleton as _ } from '../ViewHelper.js';

export default class ModesView {
  //
  // Events
  //

  static get EVENTS() {
    return [
      ['-debugMode', 'onclick', 'toggleDebugMode'],
    ];
  }

  static toggleDebugMode() {
    const { debugMode } = _.store.modes;
    _.update('modes', { debugMode: !debugMode });
  }

  //
  // Render
  //

  view() { // eslint-disable-line class-methods-use-this, TODO
    const { debugMode, imageMode } = _.store.modes;

    return {
      inDebugMode: debugMode ? 'active' : '',
      inImageMode: imageMode ? 'active' : 'disable',
    };
  }

  partials() { // eslint-disable-line class-methods-use-this, TODO
    const { inDebugMode, inImageMode } = this.view();

    const demo = { classes: 'demoMode --button' };
    const debug = { classes: `-debugMode --button ${inDebugMode}` };
    const image = { classes: `imageMode --button ${inImageMode}` };
    const stack = { classes: 'stackMode --button' };

    // Label row of boxes via the first box.
    demo.label = 'Modes:';
    demo.labelStyle = 'text-align: left;';

    return {
      demoMode: _.renderBox(demo, "<div class='label --center'>Demo</div>"),
      debugMode: _.renderBox(debug, "<div class='label --center'>Easy</div>"),
      imageMode: _.renderBox(image, "<div class='label --center'>Image</div>"),
      stackMode: _.renderBox(stack, "<div class='label --center'>Mem</div>"),
    };
  }

  render() {
    _.enqueue(this, ModesView.EVENTS);

    return _.render(`
      <div class='ModesView --horizontalJustify'>
        {{>demoMode}}
        {{>debugMode}}
        {{>stackMode}}
        {{>imageMode}}
      </div>
    `, this.view(), this.partials());
  }
}
