import { ViewHelper as _ } from '../ViewHelper.js';

import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';

export default class MatrixView {
  partials() { // eslint-disable-line class-methods-use-this, TODO
    return {
      coreView: new CoreView().render(),
      escrowViewLR: new EscrowView(EscrowView.ORIENTATION.LR).render(),
      escrowViewRL: new EscrowView(EscrowView.ORIENTATION.RL).render(),
      escrowViewUD: new EscrowView(EscrowView.ORIENTATION.UD).render(),
      escrowViewDU: new EscrowView(EscrowView.ORIENTATION.DU).render(),
      escrowViewInX: new EscrowView(EscrowView.ORIENTATION.InX).render(),
      escrowViewInY: new EscrowView(EscrowView.ORIENTATION.InY).render(),
      escrowViewOutX: new EscrowView(EscrowView.ORIENTATION.OutX).render(),
      escrowViewOutY: new EscrowView(EscrowView.ORIENTATION.OutY).render(),
    };
  }
  render() {
    return _.render(`
      <div class='MatrixView flexColumn'>
        <div class='flexRow'>
          {{>escrowViewInX}}
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
          {{>escrowViewOutY}}
        </div>
      </div>
    `, {}, this.partials());
  }
}
