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
    const { label, layout } = boxConfig;
    this.label = label;
    this.layout = layout || BoxView.LAYOUTS.one;

    const [template, template2, template3] = Array.of(templates).flat();
    this.partials = { template, template2, template3 };

    this.view = view;
  }

  render() {
    const view = {
      label: this.label,
      layout: {
        oneAndOne: this.layout === BoxView.LAYOUTS.oneAndOne,
        oneAndTwo: this.layout === BoxView.LAYOUTS.oneAndTwo,
      },
    };

    return _.render(`
      <div class='BoxViewOuter'>
        {{#label}}
          <div class='label'>{{label}}</div>
        {{/label}}
        <div class='BoxView' style='{{style}}'>
          <div class='BoxViewInner column'>
            {{>template}}
          </div>
          {{#layout.oneAndOne}}
            <div class='BoxViewInner column'>
              {{>template2}}
            </div>
          {{/layout.oneAndOne}}
          {{#layout.oneAndTwo}}
            <div class='column'>
              <div class='BoxViewInner row'>
                {{>template2}}
              </div>
              <div class='BoxViewInner row'>
                {{>template3}}
              </div>
            </div>
          {{/layout.oneAndTwo}}
        </div>
      </div>
    `, view, this.partials);
  }
}
