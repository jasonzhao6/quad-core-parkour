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
        <ol>
          <li class='--icon'>&#9782;</li>
          <li class='label'>Stack: [</li>
          <li class='--ellipsis'>...</li>
          <li>-99</li>
          <li>-99</li>
          <li>-99</li>
          <li>-99</li>
          <li>-99</li>
          <li>-99</li>
          <li>]</li>
        </ol>
      </div>
    `, this.view());
  }
}
