/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class EscrowView {
  //
  // Constants
  //

  static get TYPES() {
    return {
      BusLR: 'message-bus left-right',
      BusUD: 'message-bus up-down',
      InX: 'in.x up-down',
      InY: 'in.y up-down',
      OutX: 'out.x up-down',
      OutY: 'out.y up-down',
    };
  }

  //
  // Constructor
  //

  constructor(type) {
    this.type = type;
  }

  //
  // Render
  //

  get TEMPLATE() {
    return `
      <div class='EscrowView {{type}}'>
        <div class='--icon'>
          {{#isBusLR}}&rarr;{{/isBusLR}}
          {{#isBusUD}}&uarr;{{/isBusUD}}
          {{#isInX}}&darr;{{/isInX}}
          {{#isOutX}}&darr;{{/isOutX}}
        </div>

        {{#isInX}}<div>in.x</div>{{/isInX}}
        {{#isInY}}<div>in.y</div>{{/isInY}}
        {{#isOutX}}<div>out.x</div>{{/isOutX}}
        {{#isOutY}}<div>out.y</div>{{/isOutY}}

        {{#isBus}}
          <div class='number'>000</div>
          <div class='number {{isNumberShown}}'>000</div>
          <div class='number {{isNumberShown}}'>000</div>
          <div class='number {{isNumberShown}}'>000</div>
          <div class='--ellipsis {{isEllipsisVisible}}'>...</div>
          <div class='number {{isNumberShown}}'>000</div>
          <div class='number {{isNumberShown}}'>000</div>
          <div class='number {{isNumberShown}}'>000</div>
          <div class='number'>000</div>
        {{/isBus}}

        <div class='--icon'>
          {{#isBusLR}}&larr;{{/isBusLR}}
          {{#isBusUD}}&darr;{{/isBusUD}}
          {{#isInY}}&darr;{{/isInY}}
          {{#isOutY}}&darr;{{/isOutY}}
        </div>
      </div>
    `;
  }

  context() {
    const { inDebugMode } = _.store.modes;
    const showNumber = /left/.test(this.type) ? '--block' : '--inlineBlock';

    return {
      // Classes
      type: this.type,
      isNumberShown: inDebugMode ? showNumber : '--hide',
      isEllipsisVisible: inDebugMode ? '--visible' : '--hidden',

      // Booleans
      isBus: /message-bus/.test(this.type),
      isBusLR: this.type === EscrowView.TYPES.BusLR,
      isBusUD: this.type === EscrowView.TYPES.BusUD,
      isInX: this.type === EscrowView.TYPES.InX,
      isInY: this.type === EscrowView.TYPES.InY,
      isOutX: this.type === EscrowView.TYPES.OutX,
      isOutY: this.type === EscrowView.TYPES.OutY,
    };
  }

  render() {
    return _.render(this);
  }
}
