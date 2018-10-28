/* global Mustache */

export default class View {
  render(template, view) {
    return Mustache.render(template, view);
  }
}
