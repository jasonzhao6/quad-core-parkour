import Level from '../../../models/Level.js';
import LevelView from '../LevelView.js';
import { ViewHelper } from '../../ViewHelper.js';

export default class LevelViewTest {
  static enqueue(_) {
    _.Class('LevelView', () => {
      _.method('#constructor', () => {
        _.context('When called with `number`', () => {
          const number = 0;
          const viewHelperOverride = _.proxy(new ViewHelper());
          _.allow(viewHelperOverride).toReceive('update').andReturn();

          // eslint-disable-next-line no-new
          new LevelView(number, viewHelperOverride);
          _.expect(viewHelperOverride)
            .toHaveReceived('update')
            .withArgs(['level', new Level({ number })]);

          _.assert(
            'It updates the `level` slice of store with Level instance',
            () => viewHelperOverride.isAsExpected(),
          );
        });

        _.context('When called without `number`', () => {
          const viewHelperOverride = _.proxy(new ViewHelper());
          _.allow(viewHelperOverride).toReceive('update');

          // eslint-disable-next-line no-new
          new LevelView(undefined, viewHelperOverride);
          _.expect(viewHelperOverride).toHaveReceived('update').nTimes(0);

          _.assert(
            'It does not update the store',
            () => viewHelperOverride.isAsExpected(),
          );
        });
      });
    });

    // TODO consider refactoring into a holistic render test
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
