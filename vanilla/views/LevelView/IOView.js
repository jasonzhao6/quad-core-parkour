import InView from '../IOView/InView.js';
import OutView from '../IOView/OutView.js';

export default class IOView {
  constructor(_) { this._ = _; }

  render() {
    const view = {
      title: 'IO',
      calc: () => 'View',
    };

    const inView = new InView(this._).render();
    const outView = new OutView(this._).render();

    return this._.render(`
      <div class='IOView --horizontalJustify'>
        {{>inView}}
        {{>inView}}
        {{>outView}}
        {{>outView}}
      </div>
    `, view, { inView, outView });
  }
}
