export default class InView {
  constructor(_) {
    // Props
    this._ = _;
  }

  render() {
    const view = {
      title: 'In',
      calc: () => 'View',
    };

    return this._.renderBox({ label: 'in.x' }, `
      <div class='InView'>
        <ol>
          <li class='ellipsis'>...</li>
          <li>0</li><li class='highlight'>0</li><li>0</li><li>0</li><li>0</li>
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li>-99</li>
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li class='highlight'>-99</li>
        </ol>
      </div>
    `, view);
  }
}
