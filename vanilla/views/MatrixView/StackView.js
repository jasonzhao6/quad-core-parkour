/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class StackView {
  get TEMPLATE() {
    return `
      <div class='StackView'>
        <div class='--icon'>&#9782;</div>
        <div class='label'>Stack:</div>
        <div class='bracket'>[</div>
        <div class='--ellipsis'>...</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='bracket'>]</div>
      </div>
    `;
  }

  render() {
    return _.render(this);
  }
}
