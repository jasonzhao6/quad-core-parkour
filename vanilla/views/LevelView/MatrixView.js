// Helper
import { singleton as _ } from '../ViewHelper.js';

// Partials
import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';
import StackView from '../MatrixView/StackView.js';

export default class MatrixView {
  partials() { // eslint-disable-line class-methods-use-this, TODO
    const orientation = EscrowView.ORIENTATION;
    return {
      coreView: new CoreView().render(),
      escrowViewLR: new EscrowView(orientation.LR).render(),
      escrowViewRL: new EscrowView(orientation.RL).render(),
      escrowViewUD: new EscrowView(orientation.UD).render(),
      escrowViewDU: new EscrowView(orientation.DU).render(),
      escrowViewInX: new EscrowView(orientation.InX).render(),
      escrowViewInY: new EscrowView(orientation.InY).render(),
      escrowViewOutX: new EscrowView(orientation.OutX).render(),
      escrowViewOutY: new EscrowView(orientation.OutY).render(),
      stackAboveView: new StackView().render(),
      stackBelowView: new StackView().render(),
    };
  }

  render() {
    return _.render(`
      <div class='MatrixView --verticalJustify'>
        <div class='--horizontalJustify'>
          {{>escrowViewInX}}
          {{>stackAboveView}}
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
          {{>stackBelowView}}
          {{>escrowViewOutY}}
        </div>
      </div>
    `, {}, this.partials());
  }
}
