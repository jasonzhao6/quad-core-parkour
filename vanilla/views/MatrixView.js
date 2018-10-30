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
      <div class='MatrixView'>
        <div class='row'>
          {{>coreView}}
          {{>coreView}}
        </div>
        <div class='row'>
          <div class='horizontalBus'>
            <ol>
              <li class='arrowIcon'>&darr;</li>
              <li>0</li>
              <li class='commentColor'>0</li>
              <li class='commentColor'>0</li>
              <li class='commentColor'>0</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&uarr;</li>
              <li>-99</li>
              <li class='commentColor'>-99</li>
              <li class='commentColor'>-99</li>
              <li class='commentColor'>-99</li>
            </ol>
          </div>
          <div class='horizontalBus'>
            <ol>
              <li class='arrowIcon'>&darr;</li>
              <li>-99</li>
              <li class='commentColor'>-99</li>
              <li class='commentColor'>-99</li>
              <li class='commentColor'>-99</li>
            </ol>
            <ol>
              <li class='arrowIcon'>&uarr;</li>
              <li>-99</li>
              <li class='commentColor'>&nbsp;</li>
              <li class='commentColor'>&nbsp;</li>
              <li class='commentColor'>&nbsp;</li>
            </ol>
          </div>
        </div>
        <div class='row'>
          {{>coreView}}
          {{>coreView}}
        </div>
      </div>
    `, view, { coreView });
  }
}
