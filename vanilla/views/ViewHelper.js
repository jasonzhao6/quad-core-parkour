/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['BOX_LAYOUTS', 'render'] }] */
/* eslint-disable import/prefer-default-export */ // To support import aliasing.
/* global Mustache */

import BoxView from './ViewHelper/BoxView.js';

export default class ViewHelper {
  get BOX_LAYOUTS() { return BoxView.LAYOUTS; }

  render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }

  renderBox(boxConfig, templates, view) {
    return new BoxView(this, templates, view, boxConfig).render();
  }
}
