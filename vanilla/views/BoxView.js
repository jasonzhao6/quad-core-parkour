import { ViewHelper as _ } from './ViewHelper.js';

export default class BoxView {
  constructor({ boxConfig, template, view }) {
    // Props
    const { label } = boxConfig;
    this.view = Object.assign(view, { label });
    this.partials = { template };
  }

  render() {
    return _.render(`
      <div class='BoxViewOuter'>
        <div class='label'>{{label}}</div>
        <div class='BoxView' style='{{style}}'>
          <div class='BoxViewInner'>
            {{> template}}
          </div>
        </div>
      </div>
    `, this.view, this.partials);
  }
}
