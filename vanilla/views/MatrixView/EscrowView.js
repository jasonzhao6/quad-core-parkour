import { ViewHelper as _ } from '../ViewHelper.js';

export default class EscrowView {
  static get ORIENTATION() {
    return {
      LR: 'left-right',
      RL: 'right-left',
      UD: 'up-down',
      DU: 'down-up',
      InX: 'in.x',
      InY: 'in.y',
      OutX: 'out.x',
      OutY: 'out.y',
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
      isInX: this.orientation === EscrowView.ORIENTATION.InX,
      isInY: this.orientation === EscrowView.ORIENTATION.InY,
      isOutX: this.orientation === EscrowView.ORIENTATION.OutX,
      isOutY: this.orientation === EscrowView.ORIENTATION.OutY,
      isInOrOut: /in|out/.test(this.orientation),
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
            {{#isInX}}&darr;{{/isInX}}
            {{#isOutX}}&darr;{{/isOutX}}
          </li>
          {{#isInX}}<li>in.x</li>{{/isInX}}
          {{#isOutX}}<li>out.x</li>{{/isOutX}}
          {{^isInOrOut}}
            <li class='text'>-99</li>
            <li class='text'>-99</li>
            <li class='text'>-99</li>
            <li class='text'>-99</li>
            <li class='ellipsis'>...</li>
            <li class='text'>-99</li>
            <li class='text'>-99</li>
            <li class='text'>-99</li>
            <li class='text'>-99</li>
          {{/isInOrOut}}
          {{#isInY}}<li>in.y</li>{{/isInY}}
          {{#isOutY}}<li>out.y</li>{{/isOutY}}
          <li class='icon'>
            {{#isLR}}&rarr;{{/isLR}}
            {{#isRL}}&larr;{{/isRL}}
            {{#isUD}}&darr;{{/isUD}}
            {{#isDU}}&uarr;{{/isDU}}
            {{#isInY}}&darr;{{/isInY}}
            {{#isOutY}}&darr;{{/isOutY}}
          </li>
        </ol>
      </div>
    `, this.view());
  }
}
