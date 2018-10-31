import { ViewHelper as _ } from '../ViewHelper.js';

export default class EscrowView {
  static get ORIENTATION() {
    return {
      LR: 'left-right',
      RL: 'right-left',
      UD: 'up-down',
      DU: 'down-up',
    };
  }

  constructor(orientation) {
    this.orientation = orientation;
  }

  view() {
    return {
      class: /left|right/.test(this.orientation) ? 'horizontal' : 'vertical',
      isLR: this.orientation === EscrowView.ORIENTATION.LR,
      isRL: this.orientation === EscrowView.ORIENTATION.RL,
      isUD: this.orientation === EscrowView.ORIENTATION.UD,
      isDU: this.orientation === EscrowView.ORIENTATION.DU,
    };
  }

  render() {
    return _.render(`
      <div class='EscrowView {{class}}'>
        <ol>
          <li class='icon'>
            {{#isLR}}&larr;{{/isLR}}
            {{#isRL}}&rarr;{{/isRL}}
            {{#isUD}}&uarr;{{/isUD}}
            {{#isDU}}&darr;{{/isDU}}
          </li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='ellipsis'>...</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='icon'>
            {{#isLR}}&rarr;{{/isLR}}
            {{#isRL}}&larr;{{/isRL}}
            {{#isUD}}&darr;{{/isUD}}
            {{#isDU}}&uarr;{{/isDU}}
          </li>
        </ol>
      </div>
    `, this.view());
  }
}
