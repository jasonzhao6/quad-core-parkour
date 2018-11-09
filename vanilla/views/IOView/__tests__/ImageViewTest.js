import * as colors from '../../ViewHelper/colors.js';
import md5 from '../../../3rdParty/js/md5.js';
import { ImageView } from '../ImageView.js';

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
            `It initializes a ${ImageView.SIZE} ^ 2 shadow canvas`,
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
          const [x, y] = [0, 0];
          subject.paint(x, y, 1, 1);

          _.assert(
            'It paints it white',
            () => subject.shadowCanvas[y][x] === white,
          );
        });

        _.context('When painting middle-bottom pixel orange', () => {
          const [x, y] = [10, 19];
          const orangeIndex = ImageView.COLORS.indexOf(orange);
          subject.paint(x, y, 1, 1, orangeIndex);

          _.assert(
            'It paints it orange',
            () => subject.shadowCanvas[y][x] === orange,
          );
        });
      });

      _.method('.demo', () => {
        _.context('When demoing Whiteout', () => {
          const subject = new ImageView({ shadowOnly: true });
          const hash = subject.demo();

          _.assert(
            'It paints all pixels white',
            () => subject.shadowCanvas.flat().every(pixel => pixel === white),
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });

        _.context('When demoing Checker', () => {
          const subject = new ImageView({ shadowOnly: true });
          const hash = subject.demo(1);

          _.assert(
            'It paints first top-left pixel black',
            () => subject.shadowCanvas[0][0] === black,
          );

          _.assert(
            'It paints second top-left pixel white',
            () => subject.shadowCanvas[0][1] === white,
          );

          _.assert(
            'It paints top-right pixel white',
            () => subject.shadowCanvas[0][19] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });

        _.context('When demoing Smiley', () => {
          const subject = new ImageView({ shadowOnly: true });
          const hash = subject.demo(2);

          _.assert(
            'It paints a sample background pixel black',
            () => subject.shadowCanvas[0][10] === black,
          );

          _.assert(
            'It paints a sample left-eye pixel white',
            () => subject.shadowCanvas[6][6] === white,
          );

          _.assert(
            'It paints a sample right-eye pixel white',
            () => subject.shadowCanvas[10][15] === white,
          );

          _.assert(
            'It paints a sample mouth pixel white',
            () => subject.shadowCanvas[6][14] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });

        _.context('When demoing HalfDome', () => {
          const subject = new ImageView({ shadowOnly: true });
          const hash = subject.demo(3);

          _.assert(
            'It paints a sample background pixel black',
            () => subject.shadowCanvas[0][10] === black,
          );

          _.assert(
            'It paints a sample HalfDome pixel white',
            () => subject.shadowCanvas[6][6] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });

        _.context('When demoing FireFlower', () => {
          const subject = new ImageView({ shadowOnly: true });
          const hash = subject.demo(4);

          _.assert(
            'It paints a sample background pixel white',
            () => subject.shadowCanvas[0][10] === white,
          );

          _.assert(
            'It paints a sample outline pixel black',
            () => subject.shadowCanvas[2][10] === black,
          );

          _.assert(
            'It paints a sample flower pixel orange',
            () => subject.shadowCanvas[3][10] === orange,
          );

          _.assert(
            'It paints a sample flower pixel yellow',
            () => subject.shadowCanvas[4][10] === yellow,
          );

          _.assert(
            'It paints a sample eye pixel white',
            () => subject.shadowCanvas[6][10] === white,
          );

          _.assert(
            'It paints a sample left-eye pixel black',
            () => subject.shadowCanvas[6][8] === black,
          );

          _.assert(
            'It paints a sample right-eye pixel black',
            () => subject.shadowCanvas[6][11] === black,
          );

          _.assert(
            'It paints a sample stem pixel green',
            () => subject.shadowCanvas[15][10] === green,
          );

          _.assert(
            'It paints a sample left-leaf pixel green',
            () => subject.shadowCanvas[15][5] === green,
          );

          _.assert(
            'It paints a sample right-leaf pixel green',
            () => subject.shadowCanvas[15][15] === green,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });
      });
    });
  }
}
