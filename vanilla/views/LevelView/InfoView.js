export default class InfoView {
  constructor(_) {
    // Props
    this._ = _;
  }

  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
      wrap: false,
    };
  }

  render() {
    return this._.renderBox({ label: '— Level 0: Tutorial —' }, `
      <div class='InfoView'>
        {{#wrap}}
          <div class='bullet'>Read a value from in.x and write the value to out.x</div>
          <div class='bullet'>Read a value from in.y and write the value to out.y</div>
        {{/wrap}}
        {{^wrap}}
          <div class='bullet'>Read values from in.x and in.y</div>
          <div class='bullet'>Write 0 if in.x goes from 0 to 1</div>
          <div class='bullet'>Write 1 if in.y goes from 0 to 1</div>
          <div class='bullet'>Will not happen at the same time</div>
        {{/wrap}}
      </div>
    `, this.view());
  }
}
