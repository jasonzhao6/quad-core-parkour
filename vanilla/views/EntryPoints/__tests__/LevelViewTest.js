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

      _.method('#render', () => {
        const viewHelper = new ViewHelper();
        const html = viewHelper.render(new LevelView());

        _.assert(
          'It includes all the partials',
          () => [
            html.includes('ActionsView'),
            html.includes('InfoView'),
            html.includes('IOView'),
            html.includes('MatrixView'),
            html.includes('ModesView'),
          ],
        );
      });
    });
  }
}
