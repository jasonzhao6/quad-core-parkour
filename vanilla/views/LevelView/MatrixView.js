/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

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
            {{>stackViewAbove}}
          {{/inStackMode}}
          {{>escrowViewInY}}
        </div>
        <div class='--horizontalJustify'>
          {{>coreView}}
          {{>escrowView0001}}
          {{>coreView}}
        </div>
        <div class='--horizontalJustify'>
          {{>escrowView0010}}
          {{>escrowView0111}}
        </div>
        <div class='--horizontalJustify'>
          {{>coreView}}
          {{>escrowView1011}}
          {{>coreView}}
        </div>
        <div class='--horizontalJustify'>
          {{>escrowViewOutX}}
          {{#inStackMode}}
            {{>stackViewBelow}}
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
    const { TYPES } = EscrowView;
    return {
      coreView: new CoreView().render(),
      escrowView0001: new EscrowView(TYPES.BusLR).render(),
      escrowView0010: new EscrowView(TYPES.BusUD).render(),
      escrowView0111: new EscrowView(TYPES.BusUD).render(),
      escrowView1011: new EscrowView(TYPES.BusLR).render(),
      escrowViewInX: new EscrowView(TYPES.InX).render(),
      escrowViewInY: new EscrowView(TYPES.InY).render(),
      escrowViewOutX: new EscrowView(TYPES.OutX).render(),
      escrowViewOutY: new EscrowView(TYPES.OutY).render(),
      stackViewAbove: new StackView().render(),
      stackViewBelow: new StackView().render(),
    };
  }

  render() {
    return _.render(this);
  }
}
