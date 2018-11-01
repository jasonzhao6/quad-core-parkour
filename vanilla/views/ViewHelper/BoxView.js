import { ViewHelper as _ } from '../ViewHelper.js';

export default class BoxView {
  static get LAYOUTS() {
    return {
      one: 'one', // [template]
      oneAndOne: 'oneAndOne', // [template 1, template 2]
      oneAndTwo: 'oneAndTwo', // [template 1, [template 2, template 3]]
    };
  }

  constructor(boxConfig, templates, view) {
    const { label, labelStyle, layout } = boxConfig;
    this.label = label;
    this.labelStyle = labelStyle;
    this.layout = layout || BoxView.LAYOUTS.one;
    this.templates = templates;
    this.originalView = view;
  }

  view() {
    return Object.assign({
      label: this.label,
      labelStyle: this.labelStyle,
      layout: {
        oneAndOne: this.layout === BoxView.LAYOUTS.oneAndOne,
        oneAndTwo: this.layout === BoxView.LAYOUTS.oneAndTwo,
      },
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
          <div class='label' style={{labelStyle}}>{{label}}</div>
        {{/label}}
        <div class='BoxView flexRow' style='{{style}}'>
          <div class='BoxViewInner'>
            {{>template1}}
          </div>
          {{#layout.oneAndOne}}
            <div class='right'>
              <div class='BoxViewInner'>
                {{>template2}}
              </div>
            </div>
          {{/layout.oneAndOne}}
          {{#layout.oneAndTwo}}
            <div class='right'>
              <div class='BoxViewInner'>
                {{>template2}}
              </div>
              <div class='bottom'>
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
