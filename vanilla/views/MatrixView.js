import { ViewHelper as _ } from './ViewHelper.js';

export default class MatrixView {
  render() {
    const view = {
      title: 'Matrix',
      calc: () => 'View',
    };

    return _.render(`
      <div class='MatrixView'>
        {{title}} {{calc}}
      </div>
    `, view);
  }
}
