import { ViewHelper as _ } from '../ViewHelper.js';

export default class InView {
  render() {
    const view = {
      title: 'In',
      calc: () => 'View',
    };

    return _.renderBox({ label: 'in.x' }, `
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
