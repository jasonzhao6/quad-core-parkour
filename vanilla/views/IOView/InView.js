/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class InView {
  //
  // Constructor
  //

  constructor(label, array, index) {
    // Props
    this.label = label;
    this.array = array;
    this.index = index;
  }

  //
  // Render
  //

  get TEMPLATE() {
    return `
      <div class='InView'>
        {{#array}}
          <div>{{.}}</div>
        {{/array}}
      </div>
    `;

    // return `
    //   <div class='InView'>
    //     <div class='inViewFirst --ellipsis'>...</div>
    //     <div>000</div><div class='--highlight'>000</div><div>000</div><div>000</div>
    //     <div>000</div><div>000</div><div>000</div><div>000</div><div>000</div>
    //     <div>000</div><div>000</div><div>000</div><div>000</div><div>000</div>
    //     <div class='inViewLast --ellipsis'>...</div>
    //   </div>
    // `;
  }

  context() {
    return {
      array: this.array,
      index: this.index,
    };
  }

  render() {
    return _.renderBox(this, { label: this.label });
  }
}
