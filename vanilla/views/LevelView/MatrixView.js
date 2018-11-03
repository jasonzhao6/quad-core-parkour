import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';
import StackView from '../MatrixView/StackView.js';

export default class MatrixView {
  constructor(_) { this._ = _; }

  partials() {
    const orientation = EscrowView.ORIENTATION;
    return {
      coreView: new CoreView(this._).render(),
      escrowViewLR: new EscrowView(this._, orientation.LR).render(),
      escrowViewRL: new EscrowView(this._, orientation.RL).render(),
      escrowViewUD: new EscrowView(this._, orientation.UD).render(),
      escrowViewDU: new EscrowView(this._, orientation.DU).render(),
      escrowViewInX: new EscrowView(this._, orientation.InX).render(),
      escrowViewInY: new EscrowView(this._, orientation.InY).render(),
      escrowViewOutX: new EscrowView(this._, orientation.OutX).render(),
      escrowViewOutY: new EscrowView(this._, orientation.OutY).render(),
      stackAboveView: new StackView(this._).render(),
      stackBelowView: new StackView(this._).render(),
    };
  }

  render() {
    return this._.render(`
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
