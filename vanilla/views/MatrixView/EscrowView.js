import { singleton as _ } from '../ViewHelper.js';

export default class EscrowView {
  //
  // Constants
  //

  static get DIRECTION() {
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

  //
  // Constructor
  //

  constructor(direction) {
    this.direction = direction;
  }

  //
  // Render
  //

  get TEMPLATE() {
    return `
      <div class='EscrowView {{orientation}} {{isMessageBus}}'>
        <div class='--icon'>
          {{#isLR}}&larr;{{/isLR}}
          {{#isRL}}&rarr;{{/isRL}}
          {{#isUD}}&uarr;{{/isUD}}
          {{#isDU}}&darr;{{/isDU}}

          {{#isInX}}&darr;{{/isInX}}
          {{#isOutX}}&darr;{{/isOutX}}
        </div>

        {{#isInX}}<div>in.x</div>{{/isInX}}
        {{#isInY}}<div>in.y</div>{{/isInY}}
        {{#isOutX}}<div>out.x</div>{{/isOutX}}
        {{#isOutY}}<div>out.y</div>{{/isOutY}}

        {{#isMessageBus}}
          <div class='number'>000</div>
          <div class='number {{isNumberVisible}}'>000</div>
          <div class='number {{isNumberVisible}}'>000</div>
          <div class='number {{isNumberVisible}}'>000</div>
          <div class='--ellipsis {{isEllipsisVisible}}'>...</div>
          <div class='number {{isNumberVisible}}'>000</div>
          <div class='number {{isNumberVisible}}'>000</div>
          <div class='number {{isNumberVisible}}'>000</div>
          <div class='number'>000</div>
        {{/isMessageBus}}

        <div class='--icon'>
          {{#isLR}}&rarr;{{/isLR}}
          {{#isRL}}&larr;{{/isRL}}
          {{#isUD}}&darr;{{/isUD}}
          {{#isDU}}&uarr;{{/isDU}}

          {{#isInY}}&darr;{{/isInY}}
          {{#isOutY}}&darr;{{/isOutY}}
        </div>
      </div>
    `;
  }

  context() {
    const { inDebugMode } = _.store.modes;
    const isHorizontal = /left|right/.test(this.direction);
    const isMessageBus = /left|right|up|down/.test(this.direction);
    const isNumberVisible = isHorizontal ? '--block' : '--inlineBlock';

    return {
      // Classes
      orientation: isHorizontal ? 'horizontal' : 'vertical',
      isMessageBus: isMessageBus ? 'messageBus' : false,
      isNumberVisible: inDebugMode ? isNumberVisible : '--hide',
      isEllipsisVisible: inDebugMode ? '--visible' : '--hidden',

      // Message buses
      isLR: this.direction === EscrowView.DIRECTION.LR,
      isRL: this.direction === EscrowView.DIRECTION.RL,
      isUD: this.direction === EscrowView.DIRECTION.UD,
      isDU: this.direction === EscrowView.DIRECTION.DU,

      // Inputs/outputs
      isInX: this.direction === EscrowView.DIRECTION.InX,
      isInY: this.direction === EscrowView.DIRECTION.InY,
      isOutX: this.direction === EscrowView.DIRECTION.OutX,
      isOutY: this.direction === EscrowView.DIRECTION.OutY,
    };
  }

  render() {
    return _.render(this);
  }
}
