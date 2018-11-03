/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

// Helper
import { singleton as _ } from '../ViewHelper.js';

// Partials
import InView from '../IOView/InView.js';
import OutView from '../IOView/OutView.js';

export default class IOView {
  get TEMPLATE() {
    return `
      <div class='IOView --horizontalJustify'>
        {{>inView}}
        {{>inView}}
        {{>outView}}
        {{>outView}}
      </div>
    `;
  }

  partials() {
    return {
      inView: new InView().render(),
      outView: new OutView().render(),
    };
  }

  render() {
    return _.render(this);
  }
}
