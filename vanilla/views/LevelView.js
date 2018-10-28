import View from './View.js';

import InfoView from './InfoView.js';
import MatrixView from './MatrixView.js';

export default class LevelView extends View {
  render() {
    const view = {
      title: 'Level',
      calc: () => 'View',
    };

    const infoView = new InfoView().render();
    const matrixView = new MatrixView().render();

    return super.render(`
      <div class='LevelView'>
        {{title}} {{calc}}
        {{>infoView}}
        {{>matrixView}}
      </div>
    `, view, { infoView, matrixView });
  }
}
