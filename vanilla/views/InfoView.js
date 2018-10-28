import View from './View.js';

export default class InfoView extends View {
  render() {
    const view = {
      title: 'Info',
      calc: () => 'View',
    };

    return super.render(`
      <div class='InfoView'>
        <div class='title'>&mdash; Tutorial &mdash;</div>
        <div class='info box'>
          <p>> Read a value from in.x and write the value to out.x</p>
          <p>> Read a value from in.y and write the value to out.y</p>
        </div>
      </div>
    `, view);
  }
}
