import LevelView from '../LevelView.js';

export default class LevelViewTest {
  static enqueue(_) {
    _.Class('LevelView', () => {
      const subject = new LevelView();
      const subviews = [
        'actionsView',
        'infoView',
        'ioView',
        'matrixView',
        'modesView',
      ];

      _.method('#TEMPLATE', () => {
        const template = subject.TEMPLATE;

        _.assert(
          'It includes each subview',
          () => subviews.map(subview => template.includes(`>${subview}`)),
        );
      });

      _.method('#partials', () => {
        const partials = subject.partials();

        _.assert(
          'It includes each subview',
          () => subviews.map(subview => subview in partials),
        );
      });

      _.method('#renderDom', () => {
        _.assert(
          'It exists',
          () => 'renderDom' in subject,
        );
      });
    });
  }
}
