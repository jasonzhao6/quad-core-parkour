import { ViewHelper as _ } from './ViewHelper.js';

import CoreView from './CoreView.js';

export default class MatrixView {
  render() {
    const view = {
      title: 'Matrix',
      calc: () => 'View',
    };

    const coreView = new CoreView().render();

    return _.render(`
      <div class='MatrixView flexColumn'>
        <div class='flexRow'>
          {{>coreView}}
          {{>coreView}}
        </div>
        <div class='flexRow'>
          <div class='horizontalBus'>
            <ol>
              <li class='arrowIcon'>&darr;</li>
              <li>0</li>
              <li>0</li>
              <li>0</li>
              <li>0</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&uarr;</li>
              <li>-99</li>
              <li>-99</li>
              <li>-99</li>
              <li>-99</li>
            </ol>
          </div>
          <div class='horizontalBus'>
            <ol>
              <li class='arrowIcon'>&darr;</li>
              <li>-99</li>
              <li>-99</li>
              <li>-99</li>
              <li>-99</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&uarr;</li>
              <li>0</li>
              <li>-99</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
            </ol>
          </div>
        </div>
        <div class='flexRow'>
          {{>coreView}}
          {{>coreView}}
        </div>
      </div>
    `, view, { coreView });
  }
}
