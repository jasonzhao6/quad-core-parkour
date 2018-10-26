export const info = [
  'Read a value from in.x',
  'Double the value',
  'Write the value to out.y',
];

export const input = {
  x: [0, 2, 1, 5, 8, 5, 9, 6, 9, 2],

  /* eslint-disable max-len */
  xBig: [7, 5, 5, 5, 3, 2, 1, 9, 5, 2, 2, 1, 9, 3, 3, 3, 3, 6, 6, 7, 6, 5, 3, 8, 7, 5, 9, 3, 4, 3, 5, 3, 6, 4, 6, 4, 0, 6, 4, 6, 5, 1, 7, 5, 6, 6, 8, 8, 7, 8, 1, 8, 3, 9, 1, 1, 6, 1, 7, 6, 2, 8, 2, 2, 5, 2, 9, 5, 5, 6, 1, 0, 9, 3, 7, 2, 7, 8, 4, 6, 4, 4, 1, 5, 7, 8, 1, 6, 2, 5, 7, 5, 1, 0, 9, 0, 6, 8, 7, 8],
  /* eslint-enable max-len */
};

const double = x => x.map(value => value * 2);

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
