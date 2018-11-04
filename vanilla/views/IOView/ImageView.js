/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class ImageView {
  get TEMPLATE() {
    return `
      <div class='ImageView'>
        <canvas>
        </canvas>
      </div>
    `;
  }

  render() {
    return _.renderBox(this, { label: 'image' });
  }
}
