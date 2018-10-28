export const title = 'Desensitizer';

export const info = [
  'Read a value from in.x',
  'Compare to previous value',
  'Write 1 if changed by 10+',
  'Write 0 otherwise',
];

const changedBy10 = arr =>
  arr.map((n, i) => (Math.abs(n - [0, ...arr][i]) > 9 ? 1 : 0));

export const input = {
  x: [9, -3, -4, 8, -10, -2, -7, 4, 9, 7],

  /* eslint-disable max-len */
  xBig: [-16, 8, 3, 19, 16, 4, 16, 12, -18, 17, 3, 0, 18, -7, 12, -19, 8, 19, 0, 12, -8, 15, -3, 5, -1, 1, 7, -13, 10, 0, 2, -4, 4, 1, -1, 18, 3, -16, -13, -16, -15, 7, -20, -5, 13, -12, 17, 17, 16, -5, 17, -9, -15, -8, 5, -15, 10, -12, 3, 4, 18, -12, -7, -19, -5, -15, 17, 3, 15, -15, 0, 16, -16, 9, -9, 15, 1, -2, 2, 19, 15, -5, -17, -1, -5, 12, 4, 19, 10, -17, -20, 17, 1, 10, 5, -13, 0, -4, -1, 10],
  /* eslint-enable max-len */
};

export const output = {
  x: changedBy10(input.x),

  xBig: changedBy10(input.xBig),
};

export const solution = {
  cycleCount: 67,
  cycleCountBig: 668,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '1,0': [
      'start: sub up',
      'jgz positive',
      'negative: add 10',
      'jgz false',
      'jmp true',
      'positive: sub 9',
      'compare: jgz true',
      'false: mov 0 down',
      'jmp prep',
      'true: mov 1 down',
      'prep: mov up acc',
    ],
  },
};
