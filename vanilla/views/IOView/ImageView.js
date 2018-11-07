/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */
/* global document */

import * as colors from '../ViewHelper/colors.js';
import { singleton as _ } from '../ViewHelper.js';

export default class ImageView {
  //
  // Constants
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
      'Whiteout', // shadow canvas md5: c7ce5636b3a52d0e217938a617b4be0e
      'Checker', // shadow canvas md5: 6a78d4635cdad9808ec5a6650c52a13c
      'Smiley', // shadow canvas md5: d48bd7484c44020831f8a34e13fcfc18
      'HalfDome', // shadow canvas md5: 3493057349d7531fd31fbf22dcf3d888
      'FireFlower', // shadow canvas md5: e0dcb2d318d94fe5b2789461e8927751
    ];
  }

  //
  // Constructor
  //

  constructor({ shadowOnly } = {}) {
    // Props
    this.shadowOnly = shadowOnly;

    // State
    this.canvas = null;

    // Create a shadow canvas that is an array of arrays for easy inspection.
    this.shadowCanvas = new Array(ImageView.SIZE);
    [...this.shadowCanvas.keys()].forEach((i) => {
      this.shadowCanvas[i] = new Array(ImageView.SIZE);
      this.shadowCanvas[i].fill(ImageView.BACKGROUND_COLOR);
    });
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
  // Paint
  //

  paint(x, y, width, height, colorIndex = 0) {
    const color = ImageView.COLORS[colorIndex];

    // Paint the shadow canvas.
    [...this.shadowCanvas.keys()].forEach((i) => {
      if (i >= y && i < (y + height)) {
        [...new Array(width).keys()].forEach((j) => {
          this.shadowCanvas[i][j + x] = color;
        });
      }
    });

    if (this.shadowOnly) return this.shadowCanvas;

    // Paint the real canvas.
    this.initCanvasOnce();
    const scale = this.canvas.width / ImageView.SIZE;
    const scaledArgs = [x, y, width, height].map(n => Math.round(n * scale));
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(...scaledArgs);

    return this.shadowCanvas;
  }

  demo(demoIndex = 0) {
    return this[`paint${ImageView.DEMOS[demoIndex]}`]();
  }

  //
  // Private
  //

  initCanvasOnce() {
    if (this.canvas !== undefined) return;

    // Memoize <canvas> element.
    [this.canvas] = document.getElementsByTagName('canvas');

    // Raise error if canvas cannot be found.
    if (this.canvas === undefined) throw new Error('<canvas> cannot be found.');

    // Raise error if canvas is not a square.
    const { clientHeight, clientWidth } = this.canvas;
    if (clientHeight <= 0) throw new Error('<canvas> has no height.');
    if (clientHeight !== clientWidth) throw new Error("<canvas> isn't square.");

    // Set aspect ratio to 1:1 as it defaults to 2:1 (width:height).
    this.canvas.height = clientHeight;
    this.canvas.width = clientWidth;
  }

  resetShadowCanvas() {
    this.paint(0, 0, 20, 20, 1);
  }

  paintWhiteout() {
    return this.paint(0, 0, 20, 20);
  }

  paintChecker() {
    this.resetShadowCanvas();

    let toggle = false;
    [...new Array(ImageView.SIZE).keys()].forEach((y) => {
      // Alternate every row.
      toggle = !toggle;
      [...new Array(ImageView.SIZE).keys()].forEach((x) => {
        // Alternate every column.
        toggle = !toggle;
        if (toggle) this.paint(x, y, 1, 1);
      });
    });

    return this.shadowCanvas;
  }

  paintSmiley() {
    this.resetShadowCanvas();

    // Left eye
    this.paint(5, 4, 3, 3);
    // Right eye
    this.paint(12, 4, 3, 3);
    // Mouth from here down
    this.paint(2, 10, 3, 2);
    this.paint(3, 12, 3, 2);
    this.paint(5, 14, 10, 2);
    this.paint(14, 12, 3, 2);
    return this.paint(15, 10, 3, 2);
  }

  paintHalfDome() {
    this.resetShadowCanvas();

    this.paint(5, 3, 1, 1);
    this.paint(8, 3, 5, 1);
    this.paint(5, 4, 9, 1);
    this.paint(5, 5, 10, 1);
    this.paint(5, 6, 11, 2);
    this.paint(5, 8, 12, 1);
    this.paint(4, 9, 13, 1);
    this.paint(3, 10, 15, 2);
    this.paint(3, 12, 16, 1);
    this.paint(2, 13, 17, 1);
    this.paint(1, 14, 19, 2);
    this.paint(1, 16, 19, 2);
    return this.paint(0, 18, 20, 2);
  }

  paintFireFlower() {
    this.resetShadowCanvas();

    // White background
    this.paint(0, 0, 20, 20);

    // Black flower outline
    this.paint(5, 2, 10, 9, 1);
    this.paint(3, 3, 14, 7, 1);
    this.paint(2, 4, 16, 5, 1);

    // Black stem outline
    this.paint(8, 11, 4, 7, 1);
    this.paint(6, 13, 8, 5, 1);
    this.paint(4, 13, 12, 4, 1);

    // Black left-leaf outline
    this.paint(3, 11, 2, 5, 1);
    this.paint(2, 12, 5, 3, 1);

    // Black right-leaf outline
    this.paint(15, 11, 2, 5, 1);
    this.paint(13, 12, 5, 3, 1);

    // Orange
    this.paint(6, 3, 8, 7, 3);
    this.paint(4, 4, 12, 5, 3);
    this.paint(3, 5, 14, 3, 3);

    // Yellow
    this.paint(7, 4, 6, 5, 4);
    this.paint(5, 5, 10, 3, 4);

    // Eyes
    this.paint(7, 6, 6, 1);
    this.paint(8, 5, 1, 3, 1);
    this.paint(11, 5, 1, 3, 1);

    // Green stem
    this.paint(9, 11, 2, 6, 2);
    this.paint(6, 16, 8, 1, 2);

    // Green left-leaf
    this.paint(3, 12, 2, 3, 2);
    this.paint(3, 13, 4, 2, 2);
    this.paint(4, 14, 4, 2, 2);

    // Green right-leaf
    this.paint(15, 12, 2, 3, 2);
    this.paint(13, 13, 4, 2, 2);
    return this.paint(12, 14, 4, 2, 2);
  }
}
