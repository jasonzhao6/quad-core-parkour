/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class InfoView {
  get TEMPLATE() {
    return `
      <div class='InfoView'>
        {{#wrap}}
          <div class='bullet'>Read a value from in.x and write the value to out.x</div>
          <div class='bullet'>Read a value from in.y and write the value to out.y</div>
        {{/wrap}}
        {{^wrap}}
          <div class='bullet'>Read values from in.x and in.y</div>
          <div class='bullet'>Write 0 if in.x goes from 0 to 1</div>
          <div class='bullet'>Write 1 if in.y goes from 0 to 1</div>
          <div class='bullet'>Will not happen at the same time</div>
        {{/wrap}}
      </div>
    `;
  }

  context() {
    return { wrap: false };
  }

  render() {
    return _.renderBox(this, { label: '— Level 0: Tutorial —' });
  }
}
