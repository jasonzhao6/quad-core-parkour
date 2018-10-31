import { ViewHelper as _ } from '../ViewHelper.js';

export default class OutView {
  render() {
    const view = {
      title: 'Out',
      calc: () => 'View',
    };

    return _.renderBox({ label: 'out.x', layout: _.BOX_LAYOUTS.oneAndOne }, [`
      <div class='OutView'>
        <ol>
          <li class='highlight'>0</li><li>0</li><li>0</li><li>0</li><li>0</li>
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
    `], view);
  }
}
