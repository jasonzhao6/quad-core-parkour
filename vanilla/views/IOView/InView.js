/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class InView {
  get TEMPLATE() {
    return `
      <div class='InView'>
        <div class='--ellipsis'>...</div>
        <div>000</div><div class='--highlight'>000</div><div>000</div><div>000</div>
        <div>000</div><div>000</div><div>000</div><div>000</div><div>000</div>
        <div>000</div><div>000</div><div>000</div><div>000</div><div>000</div>
        <div class='--highlight'>000</div>
      </div>
    `;
  }

  render() {
    return _.renderBox(this, { label: 'in.x' });
  }
}
