export const title = 'Stabilizer';

export const info = [
  'Read a value from in.x',
  'Compare to previous values',
  'Write 1 if 0, 0, 0',
  'Write 0 otherwise',
];

const threeZeros = arr => arr.map((n, i) => ([
  [1, 1, arr].flat()[i] === 0,
  [1, 1, arr].flat()[i + 1] === 0,
  n === 0,
].every(condition => condition) ? 1 : 0));

export const input = {
  x: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],

  /* eslint-disable max-len */
  xBig: [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  /* eslint-enable max-len */
};

export const output = {
  x: threeZeros(input.x),

  xBig: threeZeros(input.xBig),
};

export const solution = {
  cycleCount: 62,
  cycleCountBig: 602,
  lines: {
    '0,0': [
      'mov up acc',
      'jez inc',
      'mov 0 acc',
      'jmp next',
      'inc: swp',
      'add 1',
      'next: mov acc down',
      'sav',
    ],
    '1,0': [
      'start: mov up acc',
      'sub 2',
      'jgz true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
  },
};
