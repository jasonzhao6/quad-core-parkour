import { singleton as _ } from '../ViewHelper.js';

export default class CoreView {
  get TEMPLATE() {
    return [`
      <div class='CoreView'>
        <div>start: mov left acc</div>
        <div>jez terminate</div>
        <div>swp</div>
        <div>sav</div>
        <div>sub left</div>
        <div>jgz keep</div>
        <div class='--highlight'>pass-thru: mov up down</div>
        <div>remainder: mov up down</div>
        <div>reverse: mov above acc</div>
        <div>keep: mov left acc</div>
        <div>jmp start</div>
        <div>terminate: swp</div>
        <div>terminate: swp</div>
        <div>terminate: swp</div>
        <div>terminate: swp</div>
      </div>
    `, `
      <div class='CoreView-state'>
        <div class='label'>acc</div>
        <div>-99</div>
        <div class='{{inDebugMode}}'>-99</div>
        <div class='{{inDebugMode}}'>-99</div>
        <div class='{{inDebugMode}}'>-99</div>
        <div class='{{inDebugMode}}'>-99</div>
        <div class='{{inDebugMode}} --ellipsis'>...</div>
      </div>
    `, `
      <div class='CoreView-state'>
        <div class='label'>bak</div>
        <div>0</div>
        <div class='{{inDebugMode}}'>0</div>
        <div class='{{inDebugMode}}'>0</div>
        <div class='{{inDebugMode}}'>0</div>
        <div class='{{inDebugMode}}'>0</div>
        <div class='{{inDebugMode}} --ellipsis'>...</div>
      </div>
    `];
  }

  context() {
    const { inDebugMode } = _.store.modes;
    return {
      inDebugMode: inDebugMode ? '--block' : '--hide',
    };
  }

  render() {
    return _.renderBox(this, { layout: _.BOX_LAYOUTS.oneTwo });
  }
}
