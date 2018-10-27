export const info = [
  'Read values from in.x and in.y',
  'Write in.x * in.y to out.y',
];

const multiply = (arr1, arr2) => arr1.map((n, i) => n * arr2[i]);

export const input = {
  x: [7, 4, 1, 5, 6, 2, 5, 8, 8, 0],
  y: [2, 6, 8, 2, 0, 1, 4, 2, 8, 5],

  /* eslint-disable max-len */
  xBig: [3, 10, 10, 12, 10, 4, 9, 19, 0, 19, 14, 10, 7, 1, 6, 15, 8, 5, 19, 7, 15, 3, 11, 18, 11, 6, 9, 11, 2, 19, 2, 16, 3, 1, 17, 2, 1, 18, 6, 18, 3, 9, 16, 4, 6, 8, 3, 6, 9, 7, 7, 14, 11, 15, 10, 16, 6, 9, 19, 1, 19, 4, 13, 16, 16, 11, 5, 12, 1, 5, 2, 7, 8, 9, 15, 8, 2, 17, 5, 6, 6, 6, 17, 13, 1, 10, 14, 19, 10, 5, 19, 8, 8, 17, 3, 12, 10, 2, 4, 3],
  yBig: [18, 17, 8, 0, 9, 8, 11, 2, 7, 0, 2, 11, 9, 19, 6, 19, 14, 0, 18, 2, 16, 1, 14, 12, 11, 7, 9, 17, 8, 12, 6, 7, 5, 18, 19, 18, 1, 16, 3, 5, 10, 9, 19, 6, 2, 4, 19, 4, 18, 7, 18, 3, 11, 12, 8, 14, 2, 18, 14, 18, 9, 9, 15, 3, 5, 4, 15, 12, 10, 3, 10, 7, 16, 11, 11, 11, 8, 9, 19, 3, 5, 19, 12, 10, 5, 15, 7, 13, 14, 9, 5, 18, 14, 16, 10, 4, 7, 3, 18, 16],
  /* eslint-enable max-len */
};

export const output = {
  y: multiply(input.x, input.y),

  yBig: multiply(input.xBig, input.yBig),
};

export const solution = {
  cycleCount: 378,
  cycleCountBig: 7617,
  lines: {
    '0,0': [
      'mov up right',
    ],
    '0,1': [
      'mov up acc',
      'sav',
      'mov left acc',
      'multiply: jez terminate',
      'sub 1',
      'swp',
      'jez terminate',
      'mov acc down',
      'mov acc down',
      'swp',
      'jmp multiply',
      'terminate: mov 0 down',
    ],
    '1,1': [
      'start: mov up acc',
      'jez terminate',
      'swp',
      'add up',
      'swp',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov 0 acc',
      'sav',
    ],
  },
};
