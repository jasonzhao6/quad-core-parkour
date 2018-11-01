import { ViewHelper as _ } from '../ViewHelper.js';

import ActionsView from '../LevelView/ActionsView.js';
import InfoView from '../LevelView/InfoView.js';
import IOView from '../LevelView/IOView.js';
import MatrixView from '../LevelView/MatrixView.js';
import ModesView from '../LevelView/ModesView.js';

export default class LevelView {
  partials() { // eslint-disable-line class-methods-use-this, TODO
    return {
      actionsView: new ActionsView().render(),
      infoView: new InfoView().render(),
      ioView: new IOView().render(),
      matrixView: new MatrixView().render(),
      modesView: new ModesView().render(),
    };
  }

  render() {
    return _.render(`
      <div class='LevelViewOuter flexCenter'>
        <div class='LevelView flexRow'>
          <div class='flexColumn'>
            <div class='title'>&mdash; Level 0: Tutorial &mdash;</div>
            {{>infoView}}
            {{>ioView}}
            {{>modesView}}
            {{>actionsView}}
          </div>
          <div class='flexColumn'>
            {{>matrixView}}
          </div>
        </div>
      </div>
    `, {}, this.partials());
  }
}
