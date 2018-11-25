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
    // write test, then refactor to following abstraction:
    // before scroll, trailing ... only, fixed indices
    // during scroll, leading and trailing ..., dynamic indices
    // after scroll, leading ... only, fixed indices

    const startScrollIndex = InView.MAX_COUNT - InView.SCROLL_OFFSET;
    const stopScrollIndex = this.array.length - 1 - InView.SCROLL_OFFSET;
    let startIndex = 0;
    let endIndex = this.array.length; // Exclusive, to be passed to slice().

    // We may need to scroll.
    if (this.array.length > InView.MAX_COUNT) {
      // When we start scrolling and need a leading `...`.
      if (this.index >= startScrollIndex) {
        // Add 1 to account for leading `...`.
        // Add another 1 to account for current index.
        startIndex = (this.index - startScrollIndex) + 1 + 1;
      }

      // Before we stop scrolling and need a trailing `...`.
      if (this.index < stopScrollIndex) {
        // Subtract 1 to account for trailing `...`.
        endIndex = (startIndex + InView.MAX_COUNT) - 1;
        // Subtract another 1 to account for leading `...`.
        if (startIndex !== 0) endIndex -= 1;
      } else {
        // When we stop scrolling, `startIndex` becomes fixed.
        // Add 1 to account for leading `...`.
        startIndex = (this.array.length - InView.MAX_COUNT) + 1;
      }
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
