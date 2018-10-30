import { ViewHelper as _ } from '../ViewHelper.js';

export default class EscrowView {
  static get ORIENTATION() { return { LR: 'left-right', UD: 'up-down' }; }

  constructor(orientation) {
    this.orientation = orientation;
  }

  view() {
    return {
      orientation: this.orientation,
      isLeftRight: this.orientation === EscrowView.ORIENTATION.LR,
      isUpDown: this.orientation === EscrowView.ORIENTATION.UD,
    };
  }

  render() {
    return _.render(`
      <div class='EscrowView {{orientation}}'>
        <ol>
          <li class='icon'>
            {{#isLeftRight}}&rarr;{{/isLeftRight}}
            {{#isUpDown}}&uarr;{{/isUpDown}}
          </li>
          <li class='text'>0</li>
          <li class='text'>0</li>
          <li class='text'>0</li>
          <li class='text'>0</li>
          {{#isLeftRight}}
            <li class='text'>0</li>
          {{/isLeftRight}}
        </ol>
        <ol>
          <li class='icon'>
            {{#isLeftRight}}&larr;{{/isLeftRight}}
            {{#isUpDown}}&darr;{{/isUpDown}}
          </li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          <li class='text'>-99</li>
          {{#isLeftRight}}
            <li class='text'>0</li>
          {{/isLeftRight}}
        </ol>
      </div>
    `, this.view());
  }
}
