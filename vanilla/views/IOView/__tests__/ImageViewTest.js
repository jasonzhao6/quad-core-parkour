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

          _.assert(
            'It initializes `isSingleton` to `false`',
            () => subject.isSingleton === false,
          );
        });

        _.context('When called with `isSingleton` set to `true`', () => {
          const subject = new ImageView(true);

          _.assert(
            'It initializes `isSingleton` to `true`',
            () => subject.isSingleton === true,
          );
        });
      });

      _.method('#TEMPLATE', () => {
        const subject = new ImageView();
        const template = subject.TEMPLATE;

        _.assert(
          'It includes a <canvas>',
          () => template.includes('<canvas></canvas>'),
        );
      });

      _.method('#render', () => {
        const subject = new ImageView();

        _.assert(
          'It exists in subject',
          () => 'render' in subject,
        );
      });

      _.method('.paint', () => {
        const subject = new ImageView();

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
          const subject = new ImageView();
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
          const subject = new ImageView();
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
          const subject = new ImageView();
          const hash = subject.demo(2);

          _.assert(
            'It paints aone of thee background pixels black',
            () => subject.shadowCanvas[0][10] === black,
          );

          _.assert(
            'It paints one of the left-eye pixels white',
            () => subject.shadowCanvas[6][6] === white,
          );

          _.assert(
            'It paints one of the right-eye pixels white',
            () => subject.shadowCanvas[10][15] === white,
          );

          _.assert(
            'It paints one of the mouth pixels white',
            () => subject.shadowCanvas[6][14] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });

        _.context('When demoing HalfDome', () => {
          const subject = new ImageView();
          const hash = subject.demo(3);

          _.assert(
            'It paints one of the background pixels black',
            () => subject.shadowCanvas[0][10] === black,
          );

          _.assert(
            'It paints one of the HalfDome pixels white',
            () => subject.shadowCanvas[6][6] === white,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });

        _.context('When demoing FireFlower', () => {
          const subject = new ImageView();
          const hash = subject.demo(4);

          _.assert(
            'It paints one of the background pixels white',
            () => subject.shadowCanvas[0][10] === white,
          );

          _.assert(
            'It paints one of the outline pixels black',
            () => subject.shadowCanvas[2][10] === black,
          );

          _.assert(
            'It paints one of the flower pixels orange',
            () => subject.shadowCanvas[3][10] === orange,
          );

          _.assert(
            'It paints one of the flower pixels yellow',
            () => subject.shadowCanvas[4][10] === yellow,
          );

          _.assert(
            'It paints one of the eye pixels white',
            () => subject.shadowCanvas[6][10] === white,
          );

          _.assert(
            'It paints one of the left-eye pixels black',
            () => subject.shadowCanvas[6][8] === black,
          );

          _.assert(
            'It paints one of the right-eye pixels black',
            () => subject.shadowCanvas[6][11] === black,
          );

          _.assert(
            'It paints one of the stem pixels green',
            () => subject.shadowCanvas[15][10] === green,
          );

          _.assert(
            'It paints one of the left-leaf pixels green',
            () => subject.shadowCanvas[15][5] === green,
          );

          _.assert(
            'It paints one of the right-leaf pixels green',
            () => subject.shadowCanvas[15][15] === green,
          );

          _.assert(
            'It hashes to expected md5',
            () => md5(subject.shadowCanvas) === hash,
          );
        });
      });

      _.method('.findAndMemoizeCanvas', () => {
        _.context('When canvas cannot be found', () => {
          const subject = new ImageView();
          const documentOverride = { getElementsByTagName: () => [] };

          const error = _.rescue(subject
            .findAndMemoizeCanvas.bind(subject, documentOverride));

          _.assert(
            'It throws a not-found error',
            () => error.message.includes('cannot be found'),
          );
        });

        // TODO

      });

    });
  }
}
