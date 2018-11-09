/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

// Helper
import { singleton as _ } from '../ViewHelper.js';

// Partials
import ImageView from '../IOView/ImageView.js';
import InView from '../IOView/InView.js';
import OutView from '../IOView/OutView.js';

export default class IOView {
  //
  // Constructor
  //

  constructor() {
    this.imageView = new ImageView();
    _.update('views', { imageView: this.imageView });
  }

  //
  // Render
  //

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
      // inViewY: new InView().render(),
      // outViewX: new OutView().render(),
      // outViewY: new OutView().render(),
      imageView: this.imageView.render(),
    };
  }

  render() {
    return _.render(this);
  }
}
