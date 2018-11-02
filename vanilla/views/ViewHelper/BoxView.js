export default class BoxView {
  static get LAYOUTS() {
    return {
      one: 'one', // [template]
      oneAndOne: 'oneAndOne', // [template 1, template 2]
      oneAndTwo: 'oneAndTwo', // [template 1, [template 2, template 3]]
    };
  }

  constructor(_, templates, view, boxConfig) {
    // Props
    this._ = _;
    this.templates = templates;
    this.originalView = view;

    // Destructure `boxConfig` props
    [
      'label',
      'labelStyle',
      'layout',
    ].forEach((key) => { this[key] = boxConfig[key]; });

    // Set default for `layout` prop
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
    }, this.originalView);
  }

  partials() {
    const [template1, template2, template3] = Array.of(this.templates).flat();
    return { template1, template2, template3 };
  }

  render() {
    return this._.render(`
      <div class='BoxViewOuter'>
        {{#label}}
          <div class='label' style='{{labelStyle}}'>{{label}}</div>
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
