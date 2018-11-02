import ActionsView from '../LevelView/ActionsView.js';
import InfoView from '../LevelView/InfoView.js';
import IOView from '../LevelView/IOView.js';
import MatrixView from '../LevelView/MatrixView.js';
import ModesView from '../LevelView/ModesView.js';

export default class LevelView {
  constructor(_) {
    // Props
    this._ = _;
  }

  partials() {
    return {
      actionsView: new ActionsView(this._).render(),
      infoView: new InfoView(this._).render(),
      ioView: new IOView(this._).render(),
      matrixView: new MatrixView(this._).render(),
      modesView: new ModesView(this._).render(),
    };
  }

  render() {
    return this._.render(`
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
