export const info = [
  'Sequences are zero-terminated',
  'Read a sequence from in.x',
  'Write the reverse to out.x',
];

const reverse = arr => arr.slice(0, -1)
  .join().split(',0').map(sequence => sequence.split(',').filter(n => n !== ''))
  .map(sequence => [...sequence.reverse(), 0])
  .flat()
  .map(n => parseInt(n, 10));

export const input = {
  x: [3, 5, 1, 7, 7, 9, 0, 0, 4, 0],

  /* eslint-disable max-len */
  xBig: [15, 9, 9, 13, 14, 2, 18, 8, 19, 14, 9, 17, 16, 6, 13, 19, 12, 8, 3, 11, 7, 4, 13, 2, 8, 17, 6, 3, 7, 9, 16, 5, 10, 6, 18, 18, 8, 16, 6, 6, 9, 11, 1, 18, 17, 10, 3, 13, 4, 8, 17, 15, 0, 14, 1, 6, 7, 9, 19, 14, 9, 6, 8, 7, 18, 0, 17, 2, 19, 6, 4, 19, 0, 3, 6, 10, 2, 2, 19, 9, 5, 0, 18, 13, 3, 19, 2, 11, 2, 8, 9, 19, 16, 9, 7, 5, 0, 0, 0, 0],
  /* eslint-enable max-len */
};

export const output = {
  x: reverse(input.x),

  xBig: reverse(input.xBig),
};

export const solution = {
  cycleCount: 81,
  cycleCountBig: 806,
  lines: {
    '0,0': [
      'init: mov 0 above',
      'start: mov up acc',
      'jez output',
      'stack: mov acc above',
      'jmp start',
      'output: mov 0 down',
      'wait: mov down acc',
    ],
    '1,0': [
      'mov up acc',
      'output: mov above acc',
      'jez terminate',
      'mov acc down',
      'jmp output',
      'terminate: mov 0 down',
      'mov 0 up',
    ],
  },
};
