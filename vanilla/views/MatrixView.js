import View from './View.js';

export default class MatrixView extends View {
  render() {
    const view = {
      title: 'Matrix',
      calc: () => 'View',
    };

    return super.render(`
      <div class='MatrixView'>
        {{title}} {{calc}}
      </div>
    `, view);
  }
}
