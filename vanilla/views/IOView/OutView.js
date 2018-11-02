export default class OutView {
  constructor(_) {
    // Props
    this._ = _;
  }

  render() {
    const boxConfig = { label: 'out.x', layout: this._.BOX_LAYOUTS.oneAndOne };
    return this._.renderBox(boxConfig, [`
      <div class='OutView'>
        <ol>
          <li class='--highlight'>0</li><li>0</li><li>0</li><li>0</li><li>0</li>
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li>-99</li>
        </ol>
      </div>
    `, `
      <div class='OutView-Output'>
        <ol>
          <li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>
          <li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>
        </ol>
      </div>
    `], {});
  }
}
