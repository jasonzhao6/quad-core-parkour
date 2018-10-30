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
          <div class='verticalBus'>
            <ol>
              <li class='arrowIcon'>&rarr;</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&larr;</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
            </ol>
          </div>
          {{>coreView}}
        </div>
        <div class='flexRow'>
          <div class='horizontalBus'>
            <ol>
              <li class='arrowIcon'>&uarr;</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&darr;</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
            </ol>
          </div>
          <div class='horizontalBus'>
            <ol>
              <li class='arrowIcon'>&uarr;</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&darr;</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
            </ol>
          </div>
        </div>
        <div class='flexRow'>
          {{>coreView}}
          <div class='verticalBus'>
            <ol>
              <li class='arrowIcon'>&rarr;</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
              <li class='value'>0</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&larr;</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
              <li class='value'>-99</li>
            </ol>
          </div>
          {{>coreView}}
        </div>
      </div>
    `, view, { coreView });
  }
}
