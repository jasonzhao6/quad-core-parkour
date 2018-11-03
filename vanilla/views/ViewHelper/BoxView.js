/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */

import { singleton as _ } from '../ViewHelper.js';

export default class BoxView {
  //
  // Constants
  //

  static get LAYOUTS() {
    return {
      one: 'one', // [template 1].
      oneOne: 'oneOne', // [template 1, template 2].
      oneTwo: 'oneTwo', // [template 1, [template 2, template 3]].
    };
  }

  //
  // Constructor
  //

  constructor(templates, context, boxConfig) {
    // Props
    this.templates = templates;
    this.originalContext = context;

    // Destructure `boxConfig` props.
    [
      'label',
      'labelStyle',
      'layout',
      'classes',
    ].forEach((key) => { this[key] = boxConfig[key]; });

    // Set default for `layout` prop.
    this.layout = this.layout || BoxView.LAYOUTS.one;
  }

  //
  // Render
  //

  get TEMPLATE() {
    return `
      <div class='BoxViewOuter'>
        {{#label}}
          <div class='boxViewLabel' style='{{labelStyle}}'>{{label}}</div>
        {{/label}}
        <div class='BoxView --horizontalJustify {{classes}}'>
          <div class='BoxViewInner'>
            {{>template1}}
          </div>

          {{#layout.oneOne}}
            <div class='boxViewRight'>
              <div class='BoxViewInner'>
                {{>template2}}
              </div>
            </div>
          {{/layout.oneOne}}

          {{#layout.oneTwo}}
            <div class='boxViewRight'>
              <div class='BoxViewInner'>
                {{>template2}}
              </div>

              <div class='boxViewBottom'>
                <div class='BoxViewInner'>
                  {{>template3}}
                </div>
              </div>
            </div>
          {{/layout.oneTwo}}
        </div>
      </div>
    `;
  }

  context() {
    return Object.assign({
      label: this.label,
      labelStyle: this.labelStyle,
      layout: {
        oneOne: this.layout === BoxView.LAYOUTS.oneOne,
        oneTwo: this.layout === BoxView.LAYOUTS.oneTwo,
      },
      classes: this.classes,
    }, this.originalContext);
  }

  partials() {
    const [template1, template2, template3] = Array.of(this.templates).flat();
    return { template1, template2, template3 };
  }

  render() {
    return _.render(this);
  }
}
