export default class OutView {
  constructor(_) {
    // Props
    this._ = _;
  }

  render() {
    const boxConfig = { label: 'out.x', layout: this._.BOX_LAYOUTS.oneAndOne };
    return this._.renderBox(boxConfig, [`
      <div class='OutView'>
        <div class='--highlight'>0</div><div>0</div><div>0</div><div>0</div>
        <div>0</div><div>0</div><div>0</div><div>0</div><div>0</div><div>0</div>
      </div>
    `, `
      <div class='OutView userOutput'>
      </div>
    `], {});
  }
}
