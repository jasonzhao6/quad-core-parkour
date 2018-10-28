import { ViewHelper as _ } from './ViewHelper.js';

export default class InfoView {
  render() {
    const view = {
      title: 'Info',
      calc: () => 'View',
    };

    return _.renderBox(`
      <div class='InfoView'>
        {{title}} {{calc}}
        <p>&gt; Read a value from in.x and write the value to out.x</p>
        <p>&gt; Read a value from in.y and write the value to out.y</p>
      </div>
    `, view);
  }
}
