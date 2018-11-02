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

  constructor(_, orientation) {
    this._ = _;
    this.orientation = orientation;
  }

  view() {
    const isLeftRight = /left|right/.test(this.orientation);

    return {
      debugClass: isLeftRight ? 'debugBlock' : 'debugInlineBlock',
      orientationClass: isLeftRight ? 'leftRight' : 'upDown',
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
    return this._.render(`
      <div class='EscrowView {{orientationClass}} {{^isInOrOut}}stretch{{/isInOrOut}}'>
        <div class='--icon'>
          {{#isLR}}&larr;{{/isLR}}
          {{#isRL}}&rarr;{{/isRL}}
          {{#isUD}}&uarr;{{/isUD}}
          {{#isDU}}&darr;{{/isDU}}
          {{#isInX}}&darr;{{/isInX}}
          {{#isOutX}}&darr;{{/isOutX}}
        </div>
        {{#isInX}}<div>in.x</div>{{/isInX}}
        {{#isOutX}}<div>out.x</div>{{/isOutX}}
        {{^isInOrOut}}
          <div class='number'>000</div>
          <div class='number {{debugClass}}'>000</div>
          <div class='number {{debugClass}}'>000</div>
          <div class='number {{debugClass}}'>000</div>
          <div class='--ellipsis debugVisible'>...</div>
          <div class='number {{debugClass}}'>000</div>
          <div class='number {{debugClass}}'>000</div>
          <div class='number {{debugClass}}'>000</div>
          <div class='number'>000</div>
        {{/isInOrOut}}
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
