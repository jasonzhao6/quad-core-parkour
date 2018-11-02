import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';
import StackView from '../MatrixView/StackView.js';

export default class MatrixView {
  constructor(_) {
    // Props
    this._ = _;
  }

  partials() { // eslint-disable-line class-methods-use-this, TODO
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
      <div class='MatrixView flexColumn'>
        <div class='flexRow'>
          {{>escrowViewInX}}
          {{>stackAboveView}}
          {{>escrowViewInY}}
        </div>
        <div class='flexRow'>
          {{>coreView}}
          {{>escrowViewRL}}
          {{>coreView}}
        </div>
        <div class='flexRow'>
          {{>escrowViewDU}}
          {{>escrowViewUD}}
        </div>
        <div class='flexRow'>
          {{>coreView}}
          {{>escrowViewLR}}
          {{>coreView}}
        </div>
        <div class='flexRow'>
          {{>escrowViewOutX}}
          {{>stackBelowView}}
          {{>escrowViewOutY}}
        </div>
      </div>
    `, {}, this.partials());
  }
}
