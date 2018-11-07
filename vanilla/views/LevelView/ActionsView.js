/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class ActionsView {
  get TEMPLATE() {
    return `
      <div class='ActionsView --horizontalJustify'>
        {{>stopButton}}
        {{>startButton}}
        {{>stepButton}}
        {{>speedButton}}
      </div>
    `;
  }

  partials() {
    const speedBoxConfig = { classes: 'speedAction --button' };
    const startBoxConfig = { classes: 'startAction --button' };
    const stepBoxConfig = { classes: 'stepAction --button' };
    const stopBoxConfig = { classes: 'stopAction --button' };

    // Label row of boxes via the first box.
    stopBoxConfig.label = 'Actions:';
    stopBoxConfig.labelStyle = 'text-align: left;';

    return {
      speedButton: _.renderBox(ActionsView.labelView('1x'), speedBoxConfig),
      startButton: _.renderBox(ActionsView.labelView('Start'), startBoxConfig),
      stepButton: _.renderBox(ActionsView.labelView('Step'), stepBoxConfig),
      stopButton: _.renderBox(ActionsView.labelView('Stop'), stopBoxConfig),
    };
  }

  render() {
    return _.render(this);
  }

  //
  // Private
  //

  static labelView(label) {
    return _.wrap(`<div class='label --center --noSelect'>${label}</div>`);
  }
}
