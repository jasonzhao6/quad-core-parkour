/* eslint-disable import/prefer-default-export */ // To support import aliasing.
/* global Mustache */

import BoxView from './ViewHelper/BoxView.js';

export class ViewHelper {
  static get BOX_LAYOUTS() { return BoxView.LAYOUTS; }

  static render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }

  static renderBox(boxConfig, templates, view) {
    return new BoxView(boxConfig, templates, view).render();
  }
}
