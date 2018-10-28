export default class LevelView {
  // constructor() {
  // };

  render() {
    const view = {
      title: 'Hello',
      calc: () => 'World',
    };

    return Mustache.render('{{title}} {{calc}}', view);
  }
}
