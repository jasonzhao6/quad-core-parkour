/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class FactoryView {
  //
  // Constructor
  //

  constructor(template) {
    this.template = template;
  }

  //
  // Render
  //

  get TEMPLATE() { return this.template; }
  render() { return _.render(this); }
}
