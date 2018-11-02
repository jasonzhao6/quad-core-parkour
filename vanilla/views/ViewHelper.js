/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['BOX_LAYOUTS', 'render'] }] */
/* eslint-disable import/prefer-default-export */ // To support import aliasing.
/* global Mustache */

import BoxView from './ViewHelper/BoxView.js';

export default class ViewHelper {
  get BOX_LAYOUTS() { return BoxView.LAYOUTS; }

  constructor() {
    // Global store
    this.store = {
      // Registered slices:
      modes: {},
    };
  }

  update(slice, sliceProps) {
    if (!(slice in this.store)) {
      throw new Error(`Slice '${slice}' is not registered in ViewHelper.`);
    }

    Object.keys(sliceProps).forEach((key) => {
      this.store[slice][key] = sliceProps[key];
    });
  }

  render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }

  renderBox(boxConfig, templates, view) {
    return new BoxView(this, templates, view, boxConfig).render();
  }
}
