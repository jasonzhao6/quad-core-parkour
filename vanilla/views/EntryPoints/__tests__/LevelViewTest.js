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
          const subject = new LevelView(number, viewHelperOverride);
          _.expect(viewHelperOverride)
            .toHaveReceived('update')
            .withArgs(['level', new Level({ number })]);

          _.assert(
            'It initializes all the props',
            () => [
              subject.number === number,
              subject._ === viewHelperOverride,
            ],
          );

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

      _.method('#goBig', () => {
        const number = 0;
        const viewHelper = new ViewHelper();
        const subject = new LevelView(number, viewHelper);

        subject.goBig();
        const level = subject._.pick('level', [
          'givenInputX',
          'givenInputY',
          'expectedOutputX',
          'expectedOutputY',
        ]);

        _.assert(
          'It resets the `level` store slice with big data set',
          () => [
            level.givenInputX.length === 100,
            level.givenInputY.length === 100,
            level.expectedOutputX.length === 100,
            level.expectedOutputY.length === 100,
          ],
        );
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
