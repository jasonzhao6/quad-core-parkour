export const title = 'Adder';

export const info = [
  'Read a value from in.x',
  'Double the value',
  'Write the value to out.y',
];

const double = arr => arr.map(n => n * 2);

export const input = {
  x: [0, 2, 1, 5, 8, 5, 9, 6, 9, 2],

  /* eslint-disable max-len */
  xBig: [62, 29, 8, 55, 11, 25, 16, 44, 3, 30, 0, 85, 41, 45, 65, 53, 63, 93, 48, 42, 76, 4, 34, 91, 12, 93, 27, 61, 91, 19, 13, 12, 32, 97, 77, 64, 1, 88, 23, 32, 58, 3, 31, 58, 16, 35, 77, 86, 44, 94, 57, 78, 9, 26, 39, 39, 35, 35, 12, 38, 36, 74, 68, 41, 85, 33, 99, 85, 43, 39, 43, 9, 88, 74, 18, 19, 53, 87, 94, 51, 25, 48, 1, 76, 11, 7, 74, 72, 53, 17, 27, 72, 53, 20, 10, 64, 81, 12, 52, 81],
  /* eslint-enable max-len */
};

export const output = {
  y: double(input.x),

  yBig: double(input.xBig),
};

export const solution = {
  cycleCount: 30,
  cycleCountBig: 300,
  lines: {
    '0,0': [
      'double: mov up acc',
      'add acc',
      'mov acc down',
    ],
    '1,0': [
      'mov up right',
    ],
    '1,1': [
      'mov left down',
    ],
  },
};
