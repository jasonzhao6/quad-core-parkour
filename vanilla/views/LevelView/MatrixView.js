import { ViewHelper as _ } from '../ViewHelper.js';

import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';

export default class MatrixView {
  partials() { // eslint-disable-line class-methods-use-this, TODO
    const coreView = new CoreView().render();
    const escrowViewLR = new EscrowView(EscrowView.ORIENTATION.LR).render();
    const escrowViewRL = new EscrowView(EscrowView.ORIENTATION.RL).render();
    const escrowViewUD = new EscrowView(EscrowView.ORIENTATION.UD).render();
    const escrowViewDU = new EscrowView(EscrowView.ORIENTATION.DU).render();

    return {
      coreView,
      escrowViewLR, escrowViewRL,
      escrowViewUD, escrowViewDU,
    };
  }
  render() {
    return _.render(`
      <div class='MatrixView flexColumn'>
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
      </div>
    `, {}, this.partials());
  }
}
