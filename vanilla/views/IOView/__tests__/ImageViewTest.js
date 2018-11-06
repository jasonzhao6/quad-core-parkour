import * as colors from '../../ViewHelper/colors.js';
import ImageView from '../ImageView.js';
import md5 from '../../../3rdParty/js/md5.js';

export default class ImageViewTest {
  static enqueue(_) {
    _.Class('ImageView', () => {
      // eslint-disable-next-line object-curly-newline
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

          _.assert(
            'It hashes to expected md5',
            () => md5(ImageView.demo()) === 'c7ce5636b3a52d0e217938a617b4be0e',
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

          _.assert(
            'It hashes to expected md5',
            () => md5(ImageView.demo(1)) === '6a78d4635cdad9808ec5a6650c52a13c',
          );
        });

        _.context('When demoing Smiley', () => {
          _.assert(
            'It paints a sample background pixel black',
            () => ImageView.demo(2)[0][10] === black,
          );

          _.assert(
            'It paints a sample left-eye pixel white',
            () => ImageView.demo(2)[6][6] === white,
          );

          _.assert(
            'It paints a sample right-eye pixel white',
            () => ImageView.demo(2)[10][15] === white,
          );

          _.assert(
            'It paints a sample mouth pixel white',
            () => ImageView.demo(2)[6][14] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(ImageView.demo(2)) === 'd48bd7484c44020831f8a34e13fcfc18',
          );
        });

        _.context('When demoing HalfDome', () => {
          _.assert(
            'It paints a sample background pixel black',
            () => ImageView.demo(2)[0][10] === black,
          );

          _.assert(
            'It paints a sample HalfDome pixel white',
            () => ImageView.demo(2)[6][6] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(ImageView.demo(3)) === '3493057349d7531fd31fbf22dcf3d888',
          );
        });

        _.context('When demoing FireFlower', () => {
          _.assert(
            'It hashes to expected md5',
            () => md5(ImageView.demo(4)) === 'e0dcb2d318d94fe5b2789461e8927751',
          );
        });
      });
    });
  }
}
