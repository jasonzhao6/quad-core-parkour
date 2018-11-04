/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials',
      'EVENTS', 'toggleDebugMode'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class ModesView {
  //
  // Events
  //

  get EVENTS() {
    return [
      ['-debugMode', 'onclick', 'toggleDebugMode'],
    ];
  }

  toggleDebugMode() {
    const { debugMode } = _.store.modes;
    _.update('modes', { debugMode: !debugMode });
  }

  //
  // Render
  //

  get TEMPLATE() {
    return `
      <div class='ModesView --horizontalJustify'>
        {{>demoMode}}
        {{>debugMode}}
        {{>stackMode}}
        {{>imageMode}}
      </div>
    `;
  }

  context() {
    const { debugMode, imageMode } = _.store.modes;

    return {
      inDebugMode: debugMode ? 'active' : '',
      inImageMode: imageMode ? 'active' : 'disabled',
    };
  }

  partials() {
    const { inDebugMode, inImageMode } = this.context();

    const demoBoxConfig = { classes: 'demoMode --button' };
    const debugBoxConfig = { classes: `-debugMode --button ${inDebugMode}` };
    const imageBoxConfig = { classes: `imageMode --button ${inImageMode}` };
    const stackBoxConfig = { classes: 'stackMode --button' };

    // Label row of boxes via the first box.
    demoBoxConfig.label = 'Modes:';
    demoBoxConfig.labelStyle = 'text-align: left;';

    return {
      demoMode: _.renderBox(ModesView.labelView('Demo'), demoBoxConfig),
      debugMode: _.renderBox(ModesView.labelView('Easy'), debugBoxConfig),
      imageMode: _.renderBox(ModesView.labelView('Image'), imageBoxConfig),
      stackMode: _.renderBox(ModesView.labelView('Mem'), stackBoxConfig),
    };
  }

  render() {
    _.enqueue(this);
    return _.render(this);
  }

  //
  // Private
  //

  static labelView(label) {
    return _.wrap(`<div class='label --center --noSelect'>${label}</div>`);
  }
}
