import { ViewHelper as _ } from '../ViewHelper.js';

import CoreView from '../MatrixView/CoreView.js';
import EscrowView from '../MatrixView/EscrowView.js';

export default class MatrixView {
  render() {
    const view = {
      title: 'Matrix',
      calc: () => 'View',
    };

    const coreView = new CoreView().render();
    const escrowViewLR = new EscrowView(EscrowView.ORIENTATION.LR).render();
    const escrowViewUD = new EscrowView(EscrowView.ORIENTATION.UD).render();

    return _.render(`
      <div class='MatrixView flexColumn'>
        <div class='flexRow'>
          {{>coreView}}
          {{>escrowViewLR}}
          {{>coreView}}
        </div>
        <div class='flexRow'>
          {{>escrowViewUD}}
          {{>escrowViewUD}}
        </div>
        <div class='flexRow'>
          {{>coreView}}
          {{>escrowViewLR}}
          {{>coreView}}
        </div>
      </div>
    `, view, { coreView, escrowViewLR, escrowViewUD });
  }
}
