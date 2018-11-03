import { singleton as _ } from '../ViewHelper.js';

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
    const { debugMode } = _.store.modes;
    const isLR = /left|right/.test(this.orientation);
    const isMessageBus = /left|right|up|down/.test(this.orientation);
    const isDebugMode = debugMode;
    const numberDebugMode = isLR ? '--block' : '--inlineBlock';

    return {
      // Classes
      orientation: isLR ? 'leftRight' : 'upDown',
      messageBus: isMessageBus ? 'messageBus' : false,
      numberDebugMode: isDebugMode ? numberDebugMode : '--hide',
      ellipsisDebugMode: isDebugMode ? '--visible' : '--hidden',

      // Message buses
      isLR: this.orientation === EscrowView.ORIENTATION.LR,
      isRL: this.orientation === EscrowView.ORIENTATION.RL,
      isUD: this.orientation === EscrowView.ORIENTATION.UD,
      isDU: this.orientation === EscrowView.ORIENTATION.DU,

      // Inputs/outputs
      isInX: this.orientation === EscrowView.ORIENTATION.InX,
      isInY: this.orientation === EscrowView.ORIENTATION.InY,
      isOutX: this.orientation === EscrowView.ORIENTATION.OutX,
      isOutY: this.orientation === EscrowView.ORIENTATION.OutY,
    };
  }

  render() {
    return _.render(`
      <div class='EscrowView {{orientation}} {{messageBus}}'>
        <div class='--icon'>
          {{#isLR}}&larr;{{/isLR}}
          {{#isRL}}&rarr;{{/isRL}}
          {{#isUD}}&uarr;{{/isUD}}
          {{#isDU}}&darr;{{/isDU}}

          {{#isInX}}&darr;{{/isInX}}
          {{#isOutX}}&darr;{{/isOutX}}
        </div>

        {{#messageBus}}
          <div class='number'>000</div>
          <div class='number {{numberDebugMode}}'>000</div>
          <div class='number {{numberDebugMode}}'>000</div>
          <div class='number {{numberDebugMode}}'>000</div>
          <div class='--ellipsis {{ellipsisDebugMode}}'>...</div>
          <div class='number {{numberDebugMode}}'>000</div>
          <div class='number {{numberDebugMode}}'>000</div>
          <div class='number {{numberDebugMode}}'>000</div>
          <div class='number'>000</div>
        {{/messageBus}}

        {{#isInX}}<div>in.x</div>{{/isInX}}
        {{#isOutX}}<div>out.x</div>{{/isOutX}}
        {{#isInY}}<div>in.y</div>{{/isInY}}
        {{#isOutY}}<div>out.y</div>{{/isOutY}}

        <div class='--icon'>
          {{#isLR}}&rarr;{{/isLR}}
          {{#isRL}}&larr;{{/isRL}}
          {{#isUD}}&darr;{{/isUD}}
          {{#isDU}}&uarr;{{/isDU}}

          {{#isInY}}&darr;{{/isInY}}
          {{#isOutY}}&darr;{{/isOutY}}
        </div>
      </div>
    `, this.view());
  }
}
