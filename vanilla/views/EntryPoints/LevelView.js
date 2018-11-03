import { singleton as _ } from '../ViewHelper.js';

// Views
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
      <div class='LevelViewOuter --center'>
        <div class='LevelView --horizontalJustify'>
          <div class='--verticalJustify'>
            {{>infoView}}
            {{>ioView}}
            {{>modesView}}
            {{>actionsView}}
          </div>
          <div class='--verticalJustify'>
            {{>matrixView}}
          </div>
        </div>
      </div>
    `, {}, this.partials());
  }
}
