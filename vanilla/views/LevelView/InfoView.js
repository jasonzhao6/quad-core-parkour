/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class InfoView {
  get TEMPLATE() {
    return `
      <div class='InfoView'>
        {{#info}}
          <div class='bullet'>{{.}}</div>
        {{/info}}
      </div>
    `;
  }

  context() {
    const { number, title, info } = _.store.level;
    return { number, title, info };
  }

  render() {
    return _.renderBox(this, { label: '— Level {{number}}: {{title}} —' });
  }
}
