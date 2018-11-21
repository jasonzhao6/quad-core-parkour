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

// Models
import Level from '../../models/Level.js';

export default class LevelView {
  //
  // Constructor
  //

  constructor(number, viewHelperOverride) {
    // Props
    this.number = number;
    this._ = viewHelperOverride || _;

    // Load level into global store.
    if (number !== undefined) this._.update('level', new Level({ number }));
  }

  //
  // Stress test
  //

  goBig() {
    this._.update('level', new Level({ number: this.number, goBig: true }));
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
      // and render only when ViewHelper is outputing html
      // So that we can diff their context instead of rendered html
      actionsView: new ActionsView().render(),
      infoView: new InfoView().render(),
      ioView: new IOView().render(),
      matrixView: new MatrixView().render(),
      modesView: new ModesView().render(),
    };
  }

  renderDom() {
    return _.renderDom(this);
  }
}
