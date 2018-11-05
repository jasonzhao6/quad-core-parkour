/* eslint class-methods-use-this: ['error', { exceptMethods:
     ['TEMPLATE', 'TEMPLATES', 'context', 'partials'] }] */
/* global document */

import { singleton as _ } from '../ViewHelper.js';
import * as colors from '../ViewHelper/colors.js';

export default class ImageView {
  //
  // Paint
  //

  static get COLORS() { return [colors.color]; }
  static get DEMOS() { return ['Smiley', 'HalfDome']; }
  static get SIZE() { return 20; }

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

  static paintSmiley() {
    ImageView.paint(5, 4, 3, 3);
    ImageView.paint(12, 4, 3, 3);
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
}
