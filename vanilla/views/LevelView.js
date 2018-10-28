import View from './View.js';
import MatrixView from './MatrixView.js';

export default class LevelView extends View {
  render() {
    const view = {
      title: 'Level',
      calc: () => 'View',
    };

    const matrixView = new MatrixView().render();

    return super.render(`
      <div class='LevelView'>
        {{title}} {{calc}}
        {{>matrixView}}
      </div>
    `, view, { matrixView });
  }
}
