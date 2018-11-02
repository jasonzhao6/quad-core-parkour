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

  partials() { // eslint-disable-line class-methods-use-this, TODO
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
      <div class='LevelViewOuter flexCenter'>
        <div class='LevelView flexRow'>
          <div class='flexColumn'>
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
