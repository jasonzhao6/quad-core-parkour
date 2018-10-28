export const title = 'Divider';

export const info = [
  'Read values from in.x and in.y',
  'Write in.x / in.y to out.x',
  'Write in.x % in.y to out.y',
];

const divide = (arr1, arr2) => arr1.map((n, i) => parseInt(n / arr2[i], 10));
const modulo = (arr1, arr2) => arr1.map((n, i) => n % arr2[i]);

export const input = {
  x: [6, 5, 6, 7, 1, 0, 7, 9, 2, 9],
  y: [2, 3, 3, 1, 2, 4, 2, 3, 2, 4],

  /* eslint-disable max-len */
  xBig: [15, 10, 3, 1, 0, 10, 9, 11, 7, 4, 15, 0, 10, 2, 15, 2, 10, 13, 1, 10, 17, 16, 3, 0, 13, 5, 8, 3, 19, 0, 9, 2, 10, 9, 9, 12, 18, 5, 6, 19, 0, 10, 19, 19, 0, 2, 8, 15, 1, 7, 17, 9, 0, 16, 18, 3, 18, 2, 7, 5, 4, 12, 9, 16, 17, 7, 17, 1, 15, 15, 1, 16, 9, 9, 4, 18, 4, 17, 19, 15, 19, 16, 15, 11, 1, 10, 4, 19, 16, 3, 12, 12, 9, 17, 4, 11, 17, 7, 4, 18],
  yBig: [18, 13, 7, 9, 10, 10, 11, 6, 9, 6, 17, 17, 19, 13, 17, 1, 4, 13, 4, 10, 2, 7, 20, 14, 10, 30, 7, 10, 15, 8, 4, 6, 2, 18, 9, 18, 9, 2, 15, 16, 40, 10, 15, 8, 12, 10, 18, 2, 8, 18, 3, 11, 10, 1, 19, 12, 15, 18, 7, 9, 3, 6, 17, 17, 4, 8, 9, 8, 3, 12, 50, 1, 16, 1, 19, 14, 17, 6, 16, 19, 4, 18, 16, 15, 17, 9, 19, 7, 13, 6, 1, 2, 7, 16, 60, 3, 15, 12, 9, 18],
  /* eslint-enable max-len */
};

export const output = {
  x: divide(input.x, input.y),
  y: modulo(input.x, input.y),

  xBig: divide(input.xBig, input.yBig),
  yBig: modulo(input.xBig, input.yBig),
};

export const solution = {
  cycleCount: 277,
  cycleCountBig: 2281,
  lines: {
    '0,0': [
      'start: mov up acc',
      'divide: sub right',
      'jgz more',
      'jez more',
      'mov 1 right',
      'mov 0 down',
      'add right',
      'mov 0 right',
      'mov acc right',
      'jmp start',
      'more: mov 1 right',
      'mov 1 down',
      'jmp divide',
    ],
    '0,1': [
      'mov up acc',
      'mov acc left',
      'sav',
      'divide: mov left acc',
      'jez remainder',
      'swp',
      'mov acc left',
      'swp',
      'jmp divide',
      'remainder: mov left down',
    ],
    '1,0': [
      'start: mov up acc',
      'jez quotient',
      'swp',
      'add 1',
      'swp',
      'jmp start',
      'quotient: swp',
      'mov acc down',
    ],
    '1,1': [
      'mov up down',
    ],
  },
};
