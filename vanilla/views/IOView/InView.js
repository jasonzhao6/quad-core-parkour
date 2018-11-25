/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class InView {
  //
  // Constants
  //

  static get MAX_COUNT() { return 16; }
  static get SCROLL_OFFSET() { return 3; }

  //
  // Constructor
  //

  constructor(label, array, index) {
    // Props
    this.label = label;
    this.array = array || [];
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
    let startIndex; // Inclusive.
    let endIndex; // Exclusive.

    const startScrollIndex = InView.MAX_COUNT - InView.SCROLL_OFFSET;
    const stopScrollIndex = this.array.length - 1 - InView.SCROLL_OFFSET;

    // No scroll.
    if (this.array.length <= InView.MAX_COUNT) {
      startIndex = 0;
      endIndex = this.array.length;
    // Scroll: Before.
    } else if (this.index < startScrollIndex) {
      startIndex = 0;
      // Subtract 1 to account for trailing `...`.
      endIndex = (startIndex + InView.MAX_COUNT) - 1;
    // Scroll: During.
    } else if (this.index >= startScrollIndex && this.index < stopScrollIndex) {
      // Add 1 to account for leading `...`.
      // Add another 1 to account for current index.
      startIndex = (this.index - startScrollIndex) + 1 + 1;
      // Subtract 1 to account for trailing `...`.
      // Subtract another 1 to account for leading `...`.
      endIndex = (startIndex + InView.MAX_COUNT) - 1 - 1;
    // Scroll: After.
    } else {
      // When we stop scrolling, `startIndex` becomes fixed.
      // Add 1 to account for leading `...`.
      startIndex = (this.array.length - InView.MAX_COUNT) + 1;
      // Subtract 1 to account for leading `...`.
      endIndex = (startIndex + InView.MAX_COUNT) - 1;
    }

    return {
      array: this.array.slice(startIndex, endIndex),
      index: this.index,
    };
  }

  render() {
    return _.renderBox(this, { label: this.label });
  }
}
