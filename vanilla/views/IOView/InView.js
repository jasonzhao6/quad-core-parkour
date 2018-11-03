import { singleton as _ } from '../ViewHelper.js';

export default class InView {
  render() {
    const view = {
      title: 'In',
      calc: () => 'View',
    };

    return _.renderBox({ label: 'in.x' }, `
      <div class='InView'>
        <div class='--ellipsis'>...</div>
        <div>000</div><div class='--highlight'>000</div><div>000</div><div>000</div>
        <div>000</div><div>000</div><div>000</div><div>000</div><div>000</div>
        <div>000</div><div>000</div><div>000</div><div>000</div><div>000</div>
        <div class='--highlight'>000</div>
      </div>
    `, view);
  }
}
