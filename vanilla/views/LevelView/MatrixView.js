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
    const { DIRECTION } = EscrowView;
    return {
      coreView: new CoreView().render(),
      escrowViewLR: new EscrowView(DIRECTION.LR).render(),
      escrowViewRL: new EscrowView(DIRECTION.RL).render(),
      escrowViewUD: new EscrowView(DIRECTION.UD).render(),
      escrowViewDU: new EscrowView(DIRECTION.DU).render(),
      escrowViewInX: new EscrowView(DIRECTION.InX).render(),
      escrowViewInY: new EscrowView(DIRECTION.InY).render(),
      escrowViewOutX: new EscrowView(DIRECTION.OutX).render(),
      escrowViewOutY: new EscrowView(DIRECTION.OutY).render(),
      stackAboveView: new StackView().render(),
      stackBelowView: new StackView().render(),
    };
  }

  render() {
    return _.render(this);
  }
}
