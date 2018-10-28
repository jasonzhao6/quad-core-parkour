import { ViewHelper as _ } from './ViewHelper.js';

export default class InfoView {
  render() {
    const view = {
      title: 'Info',
      calc: () => 'View',
    };

    return _.renderBox({
      width: '310px',
      height: '90px',
    }, `
      <div class='InfoView'>
        <ol>
          {{!<li>Read values from in.x and in.y</li>}}
          {{!<li>Write 0 if in.x goes from 0 to 1</li>}}
          {{!<li>Write 1 if in.y goes from 0 to 1</li>}}
          {{!<li>Will not happen at the same time</li>}}
          <li>Read a value from in.x and write the value to out.x</li>
          <li>Read a value from in.y and write the value to out.y</li>
        </ol>
      </div>
    `, view);
  }
}

