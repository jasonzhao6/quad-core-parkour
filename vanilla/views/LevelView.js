import { ViewHelper as _ } from './ViewHelper.js';

import InfoView from './InfoView.js';
import MatrixView from './MatrixView.js';

export default class LevelView {
  render() {
    const view = {
      title: 'Level',
      calc: () => 'View',
    };

    const infoView = new InfoView().render();
    const matrixView = new MatrixView().render();

    return _.render(`
      {{title}} {{calc}}
      <div class='LevelView'>
        <div>
          <div class='title'>&mdash; Tutorial &mdash;</div>
          {{>infoView}}
        </div>
        <div>
          {{>matrixView}}
        </div>
      </div>
    `, view, { infoView, matrixView });
  }
}
