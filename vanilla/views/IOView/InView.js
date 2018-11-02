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
        <div>0</div><div class='--highlight'>0</div><div>0</div><div>0</div>
        <div>0</div><div>-99</div><div>-99</div><div>-99</div><div>-99</div>
        <div>-99</div><div>-99</div><div>-99</div><div>-99</div><div>-99</div>
        <div class='--highlight'>-99</div>
      </div>
    `, view);
  }
}
