import { ViewHelper as _ } from './ViewHelper.js';

import InView from './InView.js';

export default class IOView {
  render() {
    const view = {
      title: 'IO',
      calc: () => 'View',
      wrap: false,
    };

    const inView = new InView().render();

    return _.render(`
      <div class='IOView'>
        {{>inView}}
        {{>inView}}
        {{^wrap}}
        {{/wrap}}
        {{#wrap}}
        {{/wrap}}
      </div>
    `, view, { inView });
  }
}
