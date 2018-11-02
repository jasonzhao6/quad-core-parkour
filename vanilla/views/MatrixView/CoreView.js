export default class CoreView {
  constructor(_) {
    // Props
    this._ = _;
  }

  render() {
    const view = {
      debugMode: this._.store.modes.debugMode ? '--block' : '--hide',

      title: 'Core',
      calc: () => 'View',
    };

    return this._.renderBox({ layout: this._.BOX_LAYOUTS.oneAndTwo }, [`
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
        <div class='{{debugMode}}'>-99</div>
        <div class='{{debugMode}}'>-99</div>
        <div class='{{debugMode}}'>-99</div>
        <div class='{{debugMode}}'>-99</div>
        <div class='{{debugMode}} --ellipsis'>...</div>
      </div>
    `, `
      <div class='CoreView-state'>
        <div class='label'>bak</div>
        <div>0</div>
        <div class='{{debugMode}}'>0</div>
        <div class='{{debugMode}}'>0</div>
        <div class='{{debugMode}}'>0</div>
        <div class='{{debugMode}}'>0</div>
        <div class='{{debugMode}} --ellipsis'>...</div>
      </div>
    `], view);
  }
}
