/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */
/* global document */

import * as colors from '../ViewHelper/colors.js';
import { singleton as _ } from '../ViewHelper.js';

export default class ImageView {
  //
  // Paint
  //

  static get SIZE() { return 20; }
  static get BACKGROUND_COLOR() { return colors.black; }
  static get COLORS() {
    return [
      colors.white,
      colors.black,
      colors.green,
      colors.orange,
      colors.yellow,
    ];
  }
  static get DEMOS() {
    return [
      'Whiteout', // md5: c7ce5636b3a52d0e217938a617b4be0e
      'Checker', // md5: 6a78d4635cdad9808ec5a6650c52a13c
      'Smiley', // md5: d48bd7484c44020831f8a34e13fcfc18
      'HalfDome', // md5: 3493057349d7531fd31fbf22dcf3d888
      'FireFlower', // md5: e0dcb2d318d94fe5b2789461e8927751
    ];
  }

  static paint(x, y, width, height, colorIndex = 0) {
    const canvas = ImageView.initCanvasOnce();
    const shadowCanvas = ImageView.initShadowCanvasOnce();
    const color = ImageView.COLORS[colorIndex];

    // Paint the shadow canvas for testing.
    [...shadowCanvas.keys()].forEach((i) => {
      if (i >= y && i < (y + height)) {
        [...new Array(width).keys()].forEach((j) => {
          shadowCanvas[i][j + x] = color;
        });
      }
    });

    // If a real canvas cannot be found, short circuit.
    if (canvas === undefined || canvas === null) return shadowCanvas;

    // Otherwise, paint the real canvas.
    const scale = canvas.width / ImageView.SIZE;
    const scaledArgs = [x, y, width, height].map(n => Math.round(n * scale));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(...scaledArgs);

    return shadowCanvas;
  }

  static demo(demoIndex = 0) {
    return ImageView[`paint${ImageView.DEMOS[demoIndex]}`]();
  }

  //
  // Render
  //

  get TEMPLATE() {
    return `
      <div class='ImageView'>
        <canvas></canvas>
      </div>
    `;
  }

  render() {
    return _.renderBox(this, { label: 'image' });
  }

  //
  // Private
  //

  static initCanvasOnce() {
    if (this.canvas !== undefined) return this.canvas;
    this.initCanvasTimes = this.initCanvasTimes || 0;
    this.initCanvasTimes += 1;

    // Memoize <canvas> element if found, or else short circuit.
    [this.canvas] = [...document.getElementsByTagName('canvas'), null];
    if (this.canvas === null) return null;

    // Raise error if canvas is not a square.
    const { clientHeight, clientWidth } = this.canvas;
    if (clientHeight <= 0) throw new Error('<canvas> has no height.');
    if (clientHeight !== clientWidth) throw new Error("<canvas> isn't square.");

    // Set aspect ratio to 1:1 since it seems to default to 2:1 (width:height).
    this.canvas.height = clientHeight;
    this.canvas.width = clientWidth;

    return this.canvas;
  }

  static initShadowCanvasOnce() {
    if (this.shadowCanvas !== undefined) return this.shadowCanvas;
    this.initShadowCanvasTimes = this.initShadowCanvasTimes || 0;
    this.initShadowCanvasTimes += 1;

    // Create a `SIZE` squared matrix populated with `BACKGROUND_COLOR`.
    this.shadowCanvas = new Array(ImageView.SIZE);
    [...this.shadowCanvas.keys()].forEach((i) => {
      this.shadowCanvas[i] = new Array(ImageView.SIZE);
      this.shadowCanvas[i].fill(ImageView.BACKGROUND_COLOR);
    });

    return this.shadowCanvas;
  }

  static resetShadowCanvas() {
    ImageView.paint(0, 0, 20, 20, 1);
  }

  static paintWhiteout() {
    return ImageView.paint(0, 0, 20, 20);
  }

  static paintChecker() {
    ImageView.resetShadowCanvas();

    let toggle = false;
    [...new Array(ImageView.SIZE).keys()].forEach((y) => {
      // Alternate every row.
      toggle = !toggle;
      [...new Array(ImageView.SIZE).keys()].forEach((x) => {
        // Alternate every column.
        toggle = !toggle;
        if (toggle) ImageView.paint(x, y, 1, 1);
      });
    });

    return ImageView.shadowCanvas;
  }

  static paintSmiley() {
    ImageView.resetShadowCanvas();

    // Left eye
    ImageView.paint(5, 4, 3, 3);
    // Right eye
    ImageView.paint(12, 4, 3, 3);
    // Mouth from here down
    ImageView.paint(2, 10, 3, 2);
    ImageView.paint(3, 12, 3, 2);
    ImageView.paint(5, 14, 10, 2);
    ImageView.paint(14, 12, 3, 2);
    return ImageView.paint(15, 10, 3, 2);
  }

  static paintHalfDome() {
    ImageView.resetShadowCanvas();

    ImageView.paint(5, 3, 1, 1);
    ImageView.paint(8, 3, 5, 1);
    ImageView.paint(5, 4, 9, 1);
    ImageView.paint(5, 5, 10, 1);
    ImageView.paint(5, 6, 11, 2);
    ImageView.paint(5, 8, 12, 1);
    ImageView.paint(4, 9, 13, 1);
    ImageView.paint(3, 10, 15, 2);
    ImageView.paint(3, 12, 16, 1);
    ImageView.paint(2, 13, 17, 1);
    ImageView.paint(1, 14, 19, 2);
    ImageView.paint(1, 16, 19, 2);
    return ImageView.paint(0, 18, 20, 2);
  }

  static paintFireFlower() {
    ImageView.resetShadowCanvas();

    // White background
    ImageView.paint(0, 0, 20, 20);

    // Black flower outline
    ImageView.paint(5, 2, 10, 9, 1);
    ImageView.paint(3, 3, 14, 7, 1);
    ImageView.paint(2, 4, 16, 5, 1);

    // Black stem outline
    ImageView.paint(8, 11, 4, 7, 1);
    ImageView.paint(6, 13, 8, 5, 1);
    ImageView.paint(4, 13, 12, 4, 1);

    // Black left-leaf outline
    ImageView.paint(3, 11, 2, 5, 1);
    ImageView.paint(2, 12, 5, 3, 1);

    // Black right-leaf outline
    ImageView.paint(15, 11, 2, 5, 1);
    ImageView.paint(13, 12, 5, 3, 1);

    // Orange
    ImageView.paint(6, 3, 8, 7, 3);
    ImageView.paint(4, 4, 12, 5, 3);
    ImageView.paint(3, 5, 14, 3, 3);

    // Yellow
    ImageView.paint(7, 4, 6, 5, 4);
    ImageView.paint(5, 5, 10, 3, 4);

    // Eyes
    ImageView.paint(7, 6, 6, 1);
    ImageView.paint(8, 5, 1, 3, 1);
    ImageView.paint(11, 5, 1, 3, 1);

    // Green stem
    ImageView.paint(9, 11, 2, 6, 2);
    ImageView.paint(6, 16, 8, 1, 2);

    // Green left-leaf
    ImageView.paint(3, 12, 2, 3, 2);
    ImageView.paint(3, 13, 4, 2, 2);
    ImageView.paint(4, 14, 4, 2, 2);

    // Green right-leaf
    ImageView.paint(15, 12, 2, 3, 2);
    ImageView.paint(13, 13, 4, 2, 2);
    ImageView.paint(12, 14, 4, 2, 2);

    return ImageView.shadowCanvas; // TODO
  }
}
