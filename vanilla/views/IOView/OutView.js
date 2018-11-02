export default class OutView {
  constructor(_) {
    // Props
    this._ = _;
  }

  render() {
    const { _ } = this;
    const boxConfig = { label: 'out.x', layout: _.BOX_LAYOUTS.oneAndOne };
    return _.renderBox(boxConfig, [`
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
