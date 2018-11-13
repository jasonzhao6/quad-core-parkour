/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

// Helper
import { singleton as _ } from '../ViewHelper.js';

// Partials
// import { singleton as theImageView } from '../IOView/ImageView.js';
import InView from '../IOView/InView.js';
import OutView from '../IOView/OutView.js';

export default class IOView {
  get TEMPLATE() {
    return `
      <div class='IOView --horizontalJustify'>
        {{>inViewX}}
        {{>inViewY}}
        {{>outViewX}}
        {{>outViewY}}
        {{>imageView}}
      </div>
    `;
  }

  partials() {
    return {
      inViewX: new InView().render(),
      inViewY: new InView().render(),
      outViewX: new OutView().render(),
      outViewY: new OutView().render(),
      // imageView: theImageView.render(),
    };
  }

  render() {
    return _.render(this);
  }
}
