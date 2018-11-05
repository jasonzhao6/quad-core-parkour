/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */
/* global document */

import { singleton as _ } from '../ViewHelper.js';
import * as colors from '../ViewHelper/colors.js';

export default class ImageView {
  //
  // Paint
  //

  static get SIZE() { return 20; }
  static get COLORS() { return [colors.color]; }
  static get DEMOS() {
    return [
      'Whiteout',
      'Checker',
      'Smiley',
      'HalfDome',
      'FireFlower',
    ];
  }

  static paint(x, y, width, height, colorIndex = 0) {
    const canvas = ImageView.initCanvasOnce();
    const scale = canvas.width / ImageView.SIZE;
    const scaledArgs = [x, y, width, height].map(n => Math.round(n * scale));

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = ImageView.COLORS[colorIndex];
    ctx.fillRect(...scaledArgs);
  }

  static demo(demoIndex = 0) {
    ImageView[`paint${ImageView.DEMOS[demoIndex]}`]();
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

    // Memoize <canvas> element and raise error if not found.
    [this.canvas] = document.getElementsByTagName('canvas');
    if (this.canvas === undefined) throw new Error('Cannot find any <canvas>.');

    // Raise error if not a square.
    const { clientHeight, clientWidth } = this.canvas;
    if (clientHeight <= 0) throw new Error('<canvas> has no height.');
    if (clientHeight !== clientWidth) throw new Error("<canvas> isn't square.");

    // Set aspect ratio to 1:1 since it seems to default to 2:1 (width:height).
    this.canvas.height = clientHeight;
    this.canvas.width = clientWidth;

    return this.canvas;
  }

  static paintWhiteout() {
    ImageView.paint(0, 0, 20, 20);
  }

  static paintChecker() {
    let toggle = false;
    [...new Array(ImageView.SIZE).keys()].forEach((i) => {
      // Alternate every row.
      toggle = !toggle;
      [...new Array(ImageView.SIZE).keys()].forEach((j) => {
        // Alternate every column.
        toggle = !toggle;
        if (toggle) ImageView.paint(i, j, 1, 1);
      });
    });
  }

  static paintSmiley() {
    // Left eye
    ImageView.paint(5, 4, 3, 3);
    // Right eye
    ImageView.paint(12, 4, 3, 3);
    // Mouth from here down
    ImageView.paint(2, 10, 3, 2);
    ImageView.paint(3, 12, 3, 2);
    ImageView.paint(5, 14, 10, 2);
    ImageView.paint(14, 12, 3, 2);
    ImageView.paint(15, 10, 3, 2);
  }

  static paintHalfDome() {
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
    ImageView.paint(0, 18, 20, 2);
  }

  static paintFireFlower() {
    // Background
    ImageView.paint(0, 0, 20, 2);
    ImageView.paint(0, 2, 5, 1);
    ImageView.paint(15, 2, 5, 1);
    ImageView.paint(0, 3, 3, 1);
    ImageView.paint(17, 3, 3, 1);
    ImageView.paint(0, 4, 2, 5);
    ImageView.paint(18, 4, 2, 5);
    ImageView.paint(0, 9, 3, 1);
    ImageView.paint(17, 9, 3, 1);
    ImageView.paint(0, 10, 5, 1);
    ImageView.paint(15, 10, 5, 1);
    ImageView.paint(0, 11, 3, 1);
    ImageView.paint(17, 11, 3, 1);
    ImageView.paint(0, 12, 2, 3);
    ImageView.paint(18, 12, 2, 3);
    ImageView.paint(0, 15, 3, 1);
    ImageView.paint(17, 15, 3, 1);
    ImageView.paint(0, 16, 4, 1);
    ImageView.paint(16, 16, 4, 1);
    ImageView.paint(0, 17, 6, 1);
    ImageView.paint(14, 17, 6, 1);
    ImageView.paint(0, 18, 20, 2);
  }
}
