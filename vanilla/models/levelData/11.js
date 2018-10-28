export const title = 'Slider';

export const info = [
  'Read a value from in.x',
  'Add up the last 5 values',
  'Write the sum to out.x',
];

const sumLast5 = arr => arr.map((_n, i) =>
  [0, 0, 0, 0, ...arr].slice(i, i + 5).reduce((a, b) => a + b));

export const input = {
  x: [2, 3, 4, 5, 4, 5, 5, 3, 3, 9],

  /* eslint-disable max-len */
  xBig: [16, 38, 27, 41, 76, 79, 67, 65, 73, 28, 6, 46, 2, 3, 46, 97, 91, 71, 29, 55, 39, 99, 89, 70, 16, 10, 41, 19, 72, 13, 49, 96, 91, 95, 41, 91, 4, 2, 13, 87, 86, 80, 60, 48, 62, 12, 89, 59, 19, 83, 82, 65, 21, 12, 3, 72, 9, 69, 8, 29, 36, 62, 59, 96, 30, 8, 88, 97, 11, 85, 59, 11, 80, 33, 18, 83, 46, 72, 87, 68, 2, 15, 46, 43, 60, 65, 9, 65, 11, 88, 6, 1, 58, 40, 21, 37, 14, 65, 92, 19],
  /* eslint-enable max-len */
};

export const output = {
  x: sumLast5(input.x),

  xBig: sumLast5(input.xBig),
};

export const solution = {
  cycleCount: 40,
  cycleCountBig: 400,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc right',
      'mov acc right',
    ],
    '0,1': [
      'pass-thru: mov left down',
      'delay-2x: swp',
      'mov acc down',
      'mov left acc',
    ],
    '1,0': [
      'slide: add right',
      'mov acc down',
      'sub right',
    ],
    '1,1': [
      'pass-thru: mov up left',
      'delay-2x: swp',
      'mov acc left',
      'mov up acc',
    ],
  },
};
