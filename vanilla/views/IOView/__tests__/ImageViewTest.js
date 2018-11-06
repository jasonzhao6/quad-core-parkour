import * as colors from '../../ViewHelper/colors.js';
import ImageView from '../ImageView.js';

export default class ImageViewTest {
  static enqueue(_) {
    _.Class('ImageView', () => {
      const { black, white, green, orange, yellow } = colors;

      _.method('.paint', () => {
        _.context('When painting top-left pixel with default color', () => {
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

      _.method('.demo', () => {
        _.context('When demoing Whiteout', () => {
          _.assert(
            'It paints all pixels white',
            () => ImageView.demo().flat().every(pixel => pixel === white),
          );
        });

        _.context('When demoing Checker', () => {
          _.assert(
            'It paints first top-left pixel black',
            () => ImageView.demo(1)[0][0] === black,
          );

          _.assert(
            'It paints second top-left pixel white',
            () => ImageView.demo(1)[0][1] === white,
          );

          _.assert(
            'It paints top-right pixel white',
            () => ImageView.demo(1)[0][19] === white,
          );
        });

      });
    });
  }
}
