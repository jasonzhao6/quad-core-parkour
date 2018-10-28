/* eslint-disable import/prefer-default-export */ // To support import aliasing.
/* global Mustache */

export class ViewHelper {
  static render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }
}
