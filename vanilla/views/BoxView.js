import { ViewHelper as _ } from './ViewHelper.js';

export default class BoxView {
  constructor({ template, view }) {
    this.template = template;
    this.view = view;
  }

  render() {
    return _.render(`
      <div class='BoxView'>
        <div class='BoxViewInner'>
          {{> template}}
        </div>
      </div>
    `, this.view, { template: this.template });
  }
}
