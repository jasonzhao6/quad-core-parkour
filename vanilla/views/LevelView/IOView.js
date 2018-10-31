import { ViewHelper as _ } from '../ViewHelper.js';

import InView from '../IOView/InView.js';
import OutView from '../IOView/OutView.js';

export default class IOView {
  render() {
    const view = {
      title: 'IO',
      calc: () => 'View',
    };

    const inView = new InView().render();
    const outView = new OutView().render();

    return _.render(`
      <div class='IOView flexRow'>
        {{>inView}}
        {{>inView}}
        {{>outView}}
        {{>outView}}
      </div>
    `, view, { inView, outView });
  }
}
