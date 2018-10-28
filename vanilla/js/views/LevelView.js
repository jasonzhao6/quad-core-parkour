import View from './View.js';

export default class LevelView extends View {
  render() {
    const view = {
      title: 'Hello',
      calc: () => 'World',
    };

    return super.render(`
      <div class='LevelView'>
        {{title}} {{calc}}
      </div>
    `, view);
  }
}
