//
// This view helper should be instantiated as a singleton and imported into all
// views to provide them with the following functionalities:
//
// - A global store of all states.
// - A store update handler that triggers re-render.
// - Various render methods that take view instances with some expectations*.
// - Event binding.
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
    // TODO
    this.appEntryPoint = null;

    // Global store
    this.store = {
      // REGISTER STORE SLICES HERE.
      modes: {},
    };

    // Wait until after DOM has rendered to bind events.
    this.eventsToBind = [];
  }

  //
  // Store update handler
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
  // Render methods
  //
  // Expectations*:
  // - view.template(): A string template. Or if needed-
  //   view.templates(): An array of string templates.
  // - view.props(): A hash containing all props needed by template.
  // - view.partials(): A hash containing all partials needed by template.
  // - View.EVENTS: An array of [className, event, callback] to bind.
  //

  render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }

  renderBox(boxConfig, templates, view) {
    return new BoxView(boxConfig, templates, view).render();
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
}

export const singleton = new ViewHelper();
