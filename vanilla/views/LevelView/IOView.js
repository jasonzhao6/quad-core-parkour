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
    const level = _.pick('level', [
      'givenInputX',
      'givenInputY',
      'expectedOutputX',
      'expectedOutputY',
    ]);

    return {
      inViewX: new InView('in.x', level.givenInputX, 0).render(),
      inViewY: new InView('in.y', level.givenInputY, 0).render(),
      outViewX: new OutView(level.expectedOutputX, 0).render(),
      outViewY: new OutView(level.expectedOutputY, 0).render(),
      // imageView: theImageView.render(),
    };
  }

  render() {
    return _.render(this);
  }
}
