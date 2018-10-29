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
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li>-99</li>
          <li>-99</li><li>-99</li><li>-99</li><li>-99</li><li>-99</li>
        </ol>
      </div>
    `, view);
  }
}
