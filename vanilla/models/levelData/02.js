export const info = [
  'Read values from in.x and in.y',
  'Write in.x - in.y to out.x',
  'Write in.y - in.x to out.y',
];

const subtract = (arr1, arr2) => arr1.map((n, i) => n - arr2[i]);

export const input = {
  x: [3, 9, 7, 2, 8, 9, 5, 4, 7, 0],
  y: [1, 6, 9, 0, 2, 8, 2, 2, 3, 6],

  /* eslint-disable max-len */
  xBig: [77, 90, 7, 60, 49, 57, 76, 36, 88, 70, 40, 21, 79, 61, 49, 22, 6, 51, 66, 69, 43, 28, 47, 23, 66, 16, 50, 69, 11, 58, 79, 53, 17, 62, 25, 17, 13, 1, 54, 59, 48, 57, 35, 81, 36, 66, 46, 13, 82, 90, 50, 40, 90, 50, 68, 14, 66, 15, 90, 64, 95, 42, 86, 65, 71, 43, 94, 22, 78, 74, 42, 33, 35, 0, 23, 40, 29, 51, 58, 10, 8, 43, 6, 26, 72, 59, 38, 28, 14, 49, 71, 48, 40, 48, 52, 43, 22, 88, 28, 52],
  yBig: [16, 65, 45, 22, 69, 56, 55, 6, 98, 86, 72, 23, 51, 5, 31, 36, 19, 67, 55, 37, 79, 14, 72, 45, 32, 46, 79, 31, 67, 44, 96, 75, 33, 94, 28, 46, 22, 71, 14, 53, 27, 80, 45, 8, 72, 87, 99, 15, 91, 55, 96, 44, 87, 60, 35, 34, 20, 62, 72, 69, 87, 89, 12, 19, 53, 82, 97, 29, 39, 67, 55, 80, 14, 40, 61, 91, 16, 76, 59, 35, 17, 1, 40, 16, 13, 73, 53, 79, 86, 90, 79, 70, 74, 24, 41, 31, 61, 30, 51, 38],
  /* eslint-enable max-len */
};

export const output = {
  x: subtract(input.x, input.y),
  y: subtract(input.y, input.x),

  xBig: subtract(input.xBig, input.yBig),
  yBig: subtract(input.yBig, input.xBig),
};

export const solution = {
  cycleCount: 32,
  cycleCountBig: 302,
  lines: {
    '0,0': [
      'x-y: mov up acc',
      'sub right',
      'mov acc down',
    ],
    '0,1': [
      'mov up left',
    ],
    '1,0': [
      'split: mov up acc',
      'mov acc right',
      'mov acc down',
    ],
    '1,1': [
      'negate: mov 0 acc',
      'sub left',
      'mov acc down',
    ],
  },
};
