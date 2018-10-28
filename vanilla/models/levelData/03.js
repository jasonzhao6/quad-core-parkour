export const title = 'Dispatcher';

export const info = [
  'Read a value from in.x',
  'Write 1 to out.x if in.x > 0',
  'Write 1 to out.y if in.x = 0',
  'When not writing 1, write 0',
];

const greaterThanZero = arr => arr.map(n => (n > 0 ? 1 : 0));
const equalToZero = arr => arr.map(n => (n === 0 ? 1 : 0));

export const input = {
  x: [3, -1, -1, 4, 1, 2, 3, 1, 0, -1],

  /* eslint-disable max-len */
  xBig: [-37, 47, 22, 5, -39, 32, 4, 46, 19, -42, 4, 30, 23, -41, -30, 27, 27, 15, -7, -33, 1, -18, 5, -37, -38, -6, 27, -30, 21, 0, -44, 15, 3, 49, 21, 0, -8, 36, -19, 41, -25, 48, -12, 45, 0, 33, -20, -23, 3, -3, 10, -43, 47, -19, -11, 5, 41, 32, 17, -41, -5, -31, -30, -8, -21, 6, -44, -39, -33, -2, 10, 15, -17, -46, 4, 47, 21, -5, -48, 3, -38, 23, 14, 44, -37, -5, 40, -9, -46, 32, -3, -25, 16, 21, -50, 18, -27, 23, 21, -15],
  /* eslint-enable max-len */
};

export const output = {
  x: greaterThanZero(input.x),
  y: equalToZero(input.x),

  xBig: greaterThanZero(input.xBig),
  yBig: equalToZero(input.xBig),
};

export const solution = {
  cycleCount: 43,
  cycleCountBig: 449,
  lines: {
    '0,0': [
      'mov up down',
    ],
    '1,0': [
      'start: mov up acc',
      'split: mov acc right',
      'jgz true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
    '1,1': [
      'start: mov left acc',
      'jez true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
  },
};
