//
// This view helper should be instantiated as a singleton and imported into all
// views to provide them with the following functionalities:
//
// - A store of global state organized into slices.
// - A store update method that triggers re-render.
// - A queue that delays event binding to after DOM rendering.
// - Various render methods that take view instances with method expectations*.
// - A factory method that wraps a template into a view instance.
//

/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['BOX_LAYOUTS', 'render', 'renderBox', 'wrap'] }] */
/* eslint no-param-reassign: ['error', { 'props': true,
     'ignorePropertyModificationsFor': ['element'] }] */
/* eslint-disable import/prefer-default-export */ // To support aliasing to _.
/* global document, Mustache */

import BoxView from './ViewHelper/BoxView.js';
import FactoryView from './ViewHelper/FactoryView.js';

class ViewHelper {
  //
  // Constants
  //

  // Delegated
  get BOX_LAYOUTS() { return BoxView.LAYOUTS; }

  //
  // Constructor
  //

  constructor() {
    // Global state.
    this.store = {
      // SLICES REGISTRY:
      modes: {},
    };

    // To be rendered to DOM.
    this.entryPoint = null;

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

    this.renderToDom();
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
  // View instance method expectations*:
  //
  //   - view.EVENTS: An array of [className, event, callback] to be bound.
  //   - view.TEMPLATE: A string template.
  //     - Or view.TEMPLATES: An array of string templates for some BoxViews.
  //   - view.context(): A hash containing all values needed by template.
  //   - view.partials(): A hash containing all partials needed by template.
  //

  render(view) {
    const { template, context, partials } = ViewHelper.extract(view);
    return Mustache.render(template, context, partials);
  }

  renderBox(view, boxConfig) {
    const { template, context } = ViewHelper.extract(view);
    return new BoxView(template, context, boxConfig).render();
  }

  // This is the only method that renders to DOM; all others render to string.
  renderToDom(view) {
    if (view !== undefined) this.entryPoint = view;
    document.body.innerHTML = this.render(this.entryPoint);
    this.bindEvents();
  }

  //
  // Factory method
  //

  wrap(template) {
    return new FactoryView(template);
  }

  //
  // Private
  //

  static extract(view) {
    return {
      template: view.TEMPLATE || view.TEMPLATES,
      context: view.context ? view.context() : {},
      partials: view.partials ? view.partials() : {},
    };
  }
}

export const singleton = new ViewHelper();
