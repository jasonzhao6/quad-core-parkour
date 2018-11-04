// Helper
import { singleton as _ } from '../ViewHelper.js';

// Partials
import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';
import StackView from '../MatrixView/StackView.js';

export default class MatrixView {
  get TEMPLATE() {
    return `
      <div class='MatrixView --verticalJustify'>
        <div class='--horizontalJustify'>
          {{>escrowViewInX}}
          {{#inStackMode}}
            {{>stackAboveView}}
          {{/inStackMode}}
          {{>escrowViewInY}}
        </div>
        <div class='--horizontalJustify'>
          {{>coreView}}
          {{>escrowViewRL}}
          {{>coreView}}
        </div>
        <div class='--horizontalJustify'>
          {{>escrowViewDU}}
          {{>escrowViewUD}}
        </div>
        <div class='--horizontalJustify'>
          {{>coreView}}
          {{>escrowViewLR}}
          {{>coreView}}
        </div>
        <div class='--horizontalJustify'>
          {{>escrowViewOutX}}
          {{#inStackMode}}
            {{>stackBelowView}}
          {{/inStackMode}}
          {{>escrowViewOutY}}
        </div>
      </div>
    `;
  }

  context() {
    const { inStackMode } = _.store.modes;
    return {
      inStackMode,
    };
  }

  partials() {
    const { ORIENTATION } = EscrowView;
    return {
      coreView: new CoreView().render(),
      escrowViewLR: new EscrowView(ORIENTATION.LR).render(),
      escrowViewRL: new EscrowView(ORIENTATION.RL).render(),
      escrowViewUD: new EscrowView(ORIENTATION.UD).render(),
      escrowViewDU: new EscrowView(ORIENTATION.DU).render(),
      escrowViewInX: new EscrowView(ORIENTATION.InX).render(),
      escrowViewInY: new EscrowView(ORIENTATION.InY).render(),
      escrowViewOutX: new EscrowView(ORIENTATION.OutX).render(),
      escrowViewOutY: new EscrowView(ORIENTATION.OutY).render(),
      stackAboveView: new StackView().render(),
      stackBelowView: new StackView().render(),
    };
  }

  render() {
    return _.render(this);
  }
}
