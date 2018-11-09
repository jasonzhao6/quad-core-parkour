/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

// Helper
import { singleton as _ } from '../ViewHelper.js';

// Partials
import ActionsView from '../LevelView/ActionsView.js';
import InfoView from '../LevelView/InfoView.js';
import IOView from '../LevelView/IOView.js';
import MatrixView from '../LevelView/MatrixView.js';
import ModesView from '../LevelView/ModesView.js';

export default class LevelView {
  //
  // Constructor
  //

  constructor() {
    this.ioView = new IOView();
  }

  //
  // Render
  //

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
      actionsView: new ActionsView().render(),
      infoView: new InfoView().render(),
      ioView: this.ioView.render(),
      matrixView: new MatrixView().render(),
      modesView: new ModesView().render(),
    };
  }

  renderDom() {
    return _.renderDom(this);
  }
}
