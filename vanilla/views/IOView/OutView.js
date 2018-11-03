/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class OutView {
  get TEMPLATES() {
    return [`
      <div class='OutView'>
        <div class='--highlight'>0</div><div>0</div><div>0</div><div>0</div>
        <div>0</div><div>0</div><div>0</div><div>0</div><div>0</div><div>0</div>
      </div>
    `, `
      <div class='OutView userOutput'>
      </div>
    `];
  }

  render() {
    return _.renderBox(this, { label: 'out.x', layout: _.BOX_LAYOUTS.oneOne });
  }
}
