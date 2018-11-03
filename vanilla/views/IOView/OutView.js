import { singleton as _ } from '../ViewHelper.js';

export default class OutView {
  render() {
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
