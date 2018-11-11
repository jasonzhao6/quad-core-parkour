//
// This view helper should be instantiated as a singleton and imported into all
// views to provide them with the following functionalities:
//
// - A store of global state organized into slices.
// - A store update method that triggers re-render.
// - A queue that delays event binding to after DOM rendering.
// - Various render methods that take view instances with method expectations*.
// - A factory method that wraps a template into a view instance.
// - Various delegated methods.
//

/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['BOX_LAYOUTS', 'paint', 'paintDemo', 'render', 'renderBox', 'wrap'] }] */
/* eslint no-param-reassign: ['error', { 'props': true,
     'ignorePropertyModificationsFor': ['element'] }] */
/* eslint-disable import/prefer-default-export */ // To support aliasing to _.
/* global document, Mustache */

import BoxView from './ViewHelper/BoxView.js';
import FactoryView from './ViewHelper/FactoryView.js';
import { singleton as theImageView } from './IOView/ImageView.js';

export class ViewHelper {
  //
  // Constructor
  //

  constructor() {
    // Global state.
    this.store = {
      // SLICE REGISTRY:
      level: {},
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

    if (this.entryPoint !== null) this.renderDom();
  }

  //
  // Event binding
  //

  enqueue(view) {
    const eventsWithView = view.EVENTS.map(event => [view, ...event]);
    this.eventsToBind.splice(-1, 0, ...eventsWithView);
  }

  bindEvents(documentOverride) {
    const thisDocument = documentOverride || document;
    this.eventsToBind.forEach(([view, className, event, callback]) => {
      [...thisDocument.getElementsByClassName(className)].forEach((element) => {
        element[event] = view[callback];
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

  render(view, mustacheOverride) {
    const thisMustache = mustacheOverride || Mustache;
    const { template, context, partials } = ViewHelper.extract(view);
    return thisMustache.render(template, context, partials);
  }

  renderBox(view, boxConfig, BoxViewOverride) {
    const { template, context } = ViewHelper.extract(view);
    const BoxViewClass = BoxViewOverride || BoxView;
    return new BoxViewClass(template, context, boxConfig).render();
  }

  // This is the only method that renders to DOM; all others render to string.
  // Only entry point views and the `update` method should call this.
  renderDom(view, documentOverride) {
    // Expect entry point views to pass in themselves as an argument. Memoize
    // it, so that subsequent `update` method calls can reference it.
    if (view !== undefined) this.entryPoint = view;

    const thisDocument = documentOverride || document;
    thisDocument.body.innerHTML = this.render(this.entryPoint);
    this.bindEvents();

    // Delay to avoid rare race condition painting immediately after rendering.
    setTimeout(() => this.paintDemo(3), 0);
  }

  //
  // Factory method
  //

  wrap(template) {
    return new FactoryView(template);
  }

  //
  // Delegated
  //

  get BOX_LAYOUTS() { return BoxView.LAYOUTS; }

  paint(x, y, width, height, colorIndex, imageViewOverride) {
    const imageView = imageViewOverride || theImageView;
    imageView.paint(x, y, width, height, colorIndex);
  }

  paintDemo(demoIndex, imageViewOverride) {
    const imageView = imageViewOverride || theImageView;
    imageView.demo(demoIndex);
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
