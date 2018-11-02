export default class StackView {
  constructor(_) {
    // Props
    this._ = _;
  }

  view() { // eslint-disable-line class-methods-use-this, TODO
    return {};
  }

  render() {
    return this._.render(`
      <div class='StackView'>
        <div class='--icon'>&#9782;</div>
        <div class='label'>Stack:</div>
        <div class='bracket'>[</div>
        <div class='--ellipsis'>...</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='number'>-99</div>
        <div class='bracket'>]</div>
      </div>
    `, this.view());
  }
}
