/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

// Views
import ActionsView from '../LevelView/ActionsView.js';
import InfoView from '../LevelView/InfoView.js';
import IOView from '../LevelView/IOView.js';
import MatrixView from '../LevelView/MatrixView.js';
import ModesView from '../LevelView/ModesView.js';

export default class LevelView {
  get TEMPLATE() {
    return `
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
    `;
  }

  partials() {
    return {
      // TODO maybe initialize these views in constructor once
      // actionsView: new ActionsView().render(),
      infoView: new InfoView().render(),
      // ioView: new IOView().render(),
      // matrixView: new MatrixView().render(),
      // modesView: new ModesView().render(),
    };
  }

  renderToDom() {
    return _.renderToDom(this);
  }
}
