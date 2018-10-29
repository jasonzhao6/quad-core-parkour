import { ViewHelper as _ } from '../ViewHelper.js';

export default class OutView {
  render() {
    const view = {
      title: 'Out',
      calc: () => 'View',
    };

    return _.renderBox({ label: 'out.x' }, `
      <div class='OutView'>
        <ol>
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li>-99</li>
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li>-99</li>
        </ol>
      </div>
    `, view);
  }
}
