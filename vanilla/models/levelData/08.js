export const title = 'Starter';

export const info = [
  'Read values from in.x and in.y',
  'Write 0 if in.x goes from 0 to 1',
  'Write 1 if in.y goes from 0 to 1',
  'Will not happen at the same time',
];

const zeroToOne = (arr1, arr2) => arr1.map((a, i) => {
  if ([1, ...arr1][i] === 0 && a === 1) return 0;
  else if ([1, ...arr2][i] === 0 && arr2[i] === 1) return 1;
  return -1;
});

export const input = {
  x: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
  y: [1, 0, 1, 0, 0, 1, 1, 0, 1, 0],

  /* eslint-disable max-len */
  xBig: [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
  yBig: [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  /* eslint-enable max-len */
};

export const output = {
  y: zeroToOne(input.x, input.y),

  yBig: zeroToOne(input.xBig, input.yBig),
};

export const solution = {
  cycleCount: 63,
  cycleCountBig: 610,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '0,1': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '1,0': [
      'init: mov 1 acc',
      'start: sub up',
      'jez false',
      'jgz false',
      'true: mov 0 right',
      'jmp prep',
      'false: mov -1 right',
      'prep: mov up acc',
      'jmp start',
    ],
    '1,1': [
      'init: mov 1 acc',
      'start: sub up',
      'jez false',
      'jgz false',
      'true: mov 1 down',
      'mov left acc',
      'jmp prep',
      'false: mov left down',
      'prep: mov up acc',
      'jmp start',
    ],
  },
};
