import { ViewHelper as _ } from './ViewHelper.js';

export default class BoxView {
  constructor({ boxConfig, template, view }) {
    // Props
    this.boxConfig = boxConfig;
    this.view = view;
    this.partials = { template };
  }

  render() {
    return _.render(`
      <div class='BoxView' style='{{style}}'>
        <div class='BoxViewInner'>
          {{> template}}
        </div>
      </div>
    `, this.view, this.partials);
  }
}
