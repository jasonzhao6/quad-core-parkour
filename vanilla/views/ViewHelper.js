/* eslint-disable import/prefer-default-export */ // To support import aliasing.
/* global Mustache */

import BoxView from './ViewHelper/BoxView.js';

export class ViewHelper {
  static render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }

  static renderBox(boxConfig, template, view) {
    return new BoxView({ boxConfig, template, view }).render();
  }

  static renderStyle(hash) {
    return Object.entries(hash)
      .map(([key, value]) => `${key}: ${value};`).join('\n');
  }
}
