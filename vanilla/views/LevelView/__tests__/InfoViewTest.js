import InfoView from '../InfoView.js';
import { singleton as viewHelper } from '../../ViewHelper.js';

export default class InfoViewTest {
  static enqueue(_) {
    _.Class('InfoView', () => {
      _.method('#render', () => {
        const [number, title, info] = ['number', 'title', ['info']];
        viewHelper.update('level', { number, title, info });

        const html = new InfoView().render();
        viewHelper.reset();

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
