/* eslint-disable import/prefer-default-export */ // To support import aliasing.
/* global Mustache */

import BoxView from './BoxView.js';

export class ViewHelper {
  static render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }

  static renderBox(template, view) {
    return new BoxView({ template, view }).render();
  }
}
