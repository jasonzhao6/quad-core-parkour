import * as colors from '../../ViewHelper/colors.js';
import ImageView from '../ImageView.js';
import md5 from '../../../3rdParty/js/md5.js';

export default class ImageViewTest {
  static enqueue(_) {
    _.Class('ImageView', () => {
      // eslint-disable-next-line object-curly-newline
      const { black, white, green, orange, yellow } = colors;

      _.method('#constructor', () => {
        _.context('When called without argument', () => {
          const subject = new ImageView();

          _.assert(
            'It initializes `shadowOnly` prop to `undefined`',
            () => subject.shadowOnly === undefined,
          );

          _.assert(
            'It initializes `canvas` state to `null`',
            () => subject.canvas === null,
          );

          _.assert(
            `It initializes a ${ImageView.SIZE}x${ImageView.SIZE} shadow canvas`,
            () => [
              subject.shadowCanvas.length === ImageView.SIZE,
              subject.shadowCanvas.every(row => row.length === ImageView.SIZE),
            ],
          );

          _.assert(
            'It fills shadow canvas with `BACKGROUND_COLOR`',
            () => subject.shadowCanvas.flat()
              .map(color => color === ImageView.BACKGROUND_COLOR),
          );
        });

        _.context('When called with `shadowOnly` set to `true`', () => {
          const subject = new ImageView({ shadowOnly: true });

          _.assert(
            'It initializes `shadowOnly` prop to `true`',
            () => subject.shadowOnly === true,
          );
        });
      });

      _.method('.paint', () => {
        const subject = new ImageView({ shadowOnly: true });

        _.context('When painting top-left pixel with default color', () => {
          _.assert(
            'It paints it white',
            () => subject.paint(0, 0, 1, 1)[0][0] === white,
          );
        });

        _.context('When painting middle-bottom pixel orange', () => {
          const orangeIndex = ImageView.COLORS.indexOf(orange);
          _.assert(
            'It initializes each property',
            () => subject.paint(10, 19, 1, 1, orangeIndex)[19][10] === orange,
          );
        });
      });

      _.method('.demo', () => {
        const subject = new ImageView({ shadowOnly: true });

        _.context('When demoing Whiteout', () => {
          _.assert(
            'It paints all pixels white',
            () => subject.demo().flat().every(pixel => pixel === white),
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.demo()) === 'c7ce5636b3a52d0e217938a617b4be0e',
          );
        });

        _.context('When demoing Checker', () => {
          _.assert(
            'It paints first top-left pixel black',
            () => subject.demo(1)[0][0] === black,
          );

          _.assert(
            'It paints second top-left pixel white',
            () => subject.demo(1)[0][1] === white,
          );

          _.assert(
            'It paints top-right pixel white',
            () => subject.demo(1)[0][19] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.demo(1)) === '6a78d4635cdad9808ec5a6650c52a13c',
          );
        });

        _.context('When demoing Smiley', () => {
          _.assert(
            'It paints a sample background pixel black',
            () => subject.demo(2)[0][10] === black,
          );

          _.assert(
            'It paints a sample left-eye pixel white',
            () => subject.demo(2)[6][6] === white,
          );

          _.assert(
            'It paints a sample right-eye pixel white',
            () => subject.demo(2)[10][15] === white,
          );

          _.assert(
            'It paints a sample mouth pixel white',
            () => subject.demo(2)[6][14] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.demo(2)) === 'd48bd7484c44020831f8a34e13fcfc18',
          );
        });

        _.context('When demoing HalfDome', () => {
          _.assert(
            'It paints a sample background pixel black',
            () => subject.demo(2)[0][10] === black,
          );

          _.assert(
            'It paints a sample HalfDome pixel white',
            () => subject.demo(2)[6][6] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.demo(3)) === '3493057349d7531fd31fbf22dcf3d888',
          );
        });

        _.context('When demoing FireFlower', () => {
          _.assert(
            'It paints a sample background pixel white',
            () => subject.demo(4)[0][10] === white,
          );

          _.assert(
            'It paints a sample outline pixel black',
            () => subject.demo(4)[2][10] === black,
          );

          _.assert(
            'It paints a sample flower pixel orange',
            () => subject.demo(4)[3][10] === orange,
          );

          _.assert(
            'It paints a sample flower pixel yellow',
            () => subject.demo(4)[4][10] === yellow,
          );

          _.assert(
            'It paints a sample eye pixel white',
            () => subject.demo(4)[6][10] === white,
          );

          _.assert(
            'It paints a sample left-eye pixel black',
            () => subject.demo(4)[6][8] === black,
          );

          _.assert(
            'It paints a sample right-eye pixel black',
            () => subject.demo(4)[6][11] === black,
          );

          _.assert(
            'It paints a sample stem pixel green',
            () => subject.demo(4)[15][10] === green,
          );

          _.assert(
            'It paints a sample left-leaf pixel green',
            () => subject.demo(4)[15][5] === green,
          );

          _.assert(
            'It paints a sample right-leaf pixel green',
            () => subject.demo(4)[15][15] === green,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.demo(4)) === '0c012fc4d2c9af949fb0bc91297f2a74',
          );
        });
      });
    });
  }
}
