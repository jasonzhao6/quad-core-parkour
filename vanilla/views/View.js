/* global Mustache */

export default class View {
  render(template, view, partials) {
    return Mustache.render(template, view, partials);
  }
}
