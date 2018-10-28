import { ViewHelper as _ } from './ViewHelper.js';

import CoreView from './CoreView.js';

export default class MatrixView {
  render() {
    const view = {
      title: 'Matrix',
      calc: () => 'View',
    };

    const coreView = new CoreView().render();

    return _.render(`
      <div class='MatrixView'>
        {{title}} {{calc}}
        {{>coreView}}
      </div>
    `, view, { coreView });
  }
}
