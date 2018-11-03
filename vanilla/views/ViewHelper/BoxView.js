import { singleton as _ } from '../ViewHelper.js';

export default class BoxView {
  static get LAYOUTS() {
    return {
      one: 'one', // [template 1].
      oneAndOne: 'oneAndOne', // [template 1, template 2].
      oneAndTwo: 'oneAndTwo', // [template 1, [template 2, template 3]].
    };
  }

  constructor(boxConfig, templates, view) {
    // Props
    this.templates = templates;
    this.originalView = view;

    // Destructure `boxConfig` props.
    [
      'label',
      'labelStyle',
      'layout',
      'viewClass',
    ].forEach((key) => { this[key] = boxConfig[key]; });

    // Set default for `layout` prop.
    this.layout = this.layout || BoxView.LAYOUTS.one;
  }

  view() {
    return Object.assign({
      label: this.label,
      labelStyle: this.labelStyle,
      layout: {
        oneAndOne: this.layout === BoxView.LAYOUTS.oneAndOne,
        oneAndTwo: this.layout === BoxView.LAYOUTS.oneAndTwo,
      },
      viewClass: this.viewClass,
    }, this.originalView);
  }

  partials() {
    const [template1, template2, template3] = Array.of(this.templates).flat();
    return { template1, template2, template3 };
  }

  render() {
    return _.render(`
      <div class='BoxViewOuter'>
        {{#label}}
          <div class='boxViewLabel' style='{{labelStyle}}'>{{label}}</div>
        {{/label}}
        <div class='BoxView --horizontalJustify {{viewClass}}'>
          <div class='BoxViewInner'>
            {{>template1}}
          </div>

          {{#layout.oneAndOne}}
            <div class='boxViewRight'>
              <div class='BoxViewInner'>
                {{>template2}}
              </div>
            </div>
          {{/layout.oneAndOne}}

          {{#layout.oneAndTwo}}
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
          {{/layout.oneAndTwo}}
        </div>
      </div>
    `, this.view(), this.partials());
  }
}
