import ImageView from '../ImageView.js';
import * as colors from '../../ViewHelper/colors.js';

export default class ImageViewTest {
  static enqueue(_) {
    _.Class('ImageView', () => {
      const { black, white, green, orange, yellow } = colors;

      _.method('.paint', () => {
        _.context('When painting top-left pixel', () => {
          _.assert(
            'It paints it white',
            () => ImageView.paint(0, 0, 1, 1)[0][0] === white,
          );
        });

        _.context('When painting middle-bottom pixel orange', () => {
          const orangeIndex = ImageView.COLORS.indexOf(orange);
          _.assert(
            'It initializes each property',
            () => ImageView.paint(10, 19, 1, 1, orangeIndex)[19][10] === orange,
          );
        });
      });
    });
  }
}
