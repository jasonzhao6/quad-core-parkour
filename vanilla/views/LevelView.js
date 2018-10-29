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
      <div class='LevelViewOuter'>
        <div class='LevelView'>
          <div>
            <div class='title'>&mdash; Level 0: Tutorial &mdash;</div>
            {{>infoView}}
          </div>
          <div>
            {{>matrixView}}
          </div>
        </div>
      </div>
    `, view, { infoView, matrixView });
  }
}
