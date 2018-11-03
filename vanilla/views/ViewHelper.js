//
// This view helper should be instantiated as a singleton and imported into all
// views to provide them with the following functionalities:
//
// - A store of global states, organized by slices.
// - A store update method that triggers re-render.
// - A queue that delays event binding to after DOM rendering.
// - Various render methods that take view instances with expectations*.
//

/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['BOX_LAYOUTS', 'render', 'renderBox'] }] */
/* eslint no-param-reassign: ['error', { 'props': true,
     'ignorePropertyModificationsFor': ['element'] }] */
/* eslint-disable import/prefer-default-export */ // To support aliasing to _.
/* global document, Mustache */

import BoxView from './ViewHelper/BoxView.js';

class ViewHelper {
  get BOX_LAYOUTS() { return BoxView.LAYOUTS; }

  constructor() {
    // Global states
    this.store = {
      // REGISTER SLICES HERE.
      modes: {},
    };

    // To be rendered to <body> tag.
    this.appEntryPoint = null;

    // To be bound after DOM has rendered.
    this.eventsToBind = [];
  }

  //
  // Update method
  //

  update(slice, sliceProps) {
    if (!(slice in this.store)) {
      throw new Error(`Slice '${slice}' is not registered in ViewHelper.`);
    }

    Object.keys(sliceProps).forEach((key) => {
      this.store[slice][key] = sliceProps[key];
    });

    document.body.innerHTML = this.appEntryPoint.render();
    this.bindEvents();
  }

  //
  // Event binding
  //

  enqueue(view, events) {
    this.eventsToBind.splice(-1, 0, ...events.map(event => [view, ...event]));
  }

  bindEvents() {
    this.eventsToBind.forEach(([view, className, event, callback]) => {
      [...document.getElementsByClassName(className)].forEach((element) => {
        element[event] = view.constructor[callback];
      });
    });
  }

  //
  // Render methods
  //
  // View instance expectations*:
  //
  //   - view.EVENTS: An array of [className, event, callback] to be bound.
  //   - view.template(): A string template.
  //     - Or view.templates(): An array of string templates.
  //   - view.context(): A hash containing all values needed by template.
  //   - view.partials(): A hash containing all partials needed by template.
  //

  render(template, context, partials) {
    return Mustache.render(template, context, partials);
  }

  renderBox(boxConfig, templates, context) {
    return new BoxView(boxConfig, templates, context).render();
  }
}

export const singleton = new ViewHelper();
