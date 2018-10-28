import { ViewHelper as _ } from './ViewHelper.js';

export default class BoxView {
  constructor({ boxConfig, template, view }) {
    // Props
    const { width, height } = boxConfig;
    this.view = Object.assign(view, {
      style: _.renderStyle({ width, height }),
    });
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
