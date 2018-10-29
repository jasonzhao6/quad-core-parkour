import { ViewHelper as _ } from './ViewHelper.js';

export default class CoreView {
  render() {
    const view = {
      title: 'Core',
      calc: () => 'View',
    };

    return _.renderBox({ layout: _.BOX_LAYOUTS.oneAndTwo }, [`
      <div class='CoreView'>
        <ol>
          <li>start: mov left acc</li>
          <li>jez terminate</li>
          <li>swp</li>
          <li>sav</li>
          <li>sub left</li>
          <li>jgz keep</li>
          <li>pass-thru: mov left down</li>
          <li>remainder: mov left down</li>
          <li>reverse: mov above acc</li>
          <li>keep: mov left acc</li>
          <li>jmp start</li>
          <li>terminate: swp</li>
          <li>mov acc down</li>
          <li>mov left acc</li>
          <li>mov left acc</li>
        </ol>
      </div>
    `, `
      <div class='CoreView-Accumulator'>
        <ol>
          <li>acc</li>
          <li>0</li>
        </ol>
      </div>
    `, `
      <div class='CoreView-Backup'>
        <ol>
          <li>bak</li>
          <li>0</li>
        </ol>
      </div>
    `], view);
  }
}
