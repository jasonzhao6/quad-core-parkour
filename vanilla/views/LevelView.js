import { ViewHelper as _ } from './ViewHelper.js';

import InfoView from './InfoView.js';
import IOView from './IOView.js';
import MatrixView from './MatrixView.js';

export default class LevelView {
  render() {
    const view = {
      title: 'Level',
      calc: () => 'View',
    };

    const infoView = new InfoView().render();
    const ioView = new IOView().render();
    const matrixView = new MatrixView().render();

    return _.render(`
      <div class='LevelViewOuter'>
        <div class='LevelView'>
          <div class='column'>
            <div class='title'>&mdash; Level 0: Tutorial &mdash;</div>
            {{>infoView}}
            {{>ioView}}
          </div>
          <div class='column'>
            {{>matrixView}}
          </div>
        </div>
      </div>
    `, view, { infoView, ioView, matrixView });
  }
}
