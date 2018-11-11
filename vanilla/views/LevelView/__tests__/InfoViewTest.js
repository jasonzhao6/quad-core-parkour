import InfoView from '../InfoView.js';

export default class InfoViewTest {
  static enqueue(_) {
    _.Class('InfoView', () => {
      _.method('#render', () => {
        const [number, title, info] = ['number', 'title', ['info']];
        const subject = new InfoView();
        subject.context = () => ({ number, title, info });

        const html = subject.render();

        _.assert(
          'It renders the level number',
          () => html.includes(`Level ${number}`),
        );

        _.assert(
          'It renders the level title',
          () => html.includes(title),
        );

        _.assert(
          'It renders the level info',
          () => html.includes(info),
        );
      });
    });
  }
}
