export default class InView {
  constructor(_) {
    // Props
    this._ = _;
  }

  render() {
    const view = {
      title: 'In',
      calc: () => 'View',
    };

    return this._.renderBox({ label: 'in.x' }, `
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
