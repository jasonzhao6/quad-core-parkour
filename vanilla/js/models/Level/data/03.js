export const input = {
  x: [3, -1, -1, 4, 1, 2, 3, 1, 0, -1],
};

export const output = {
  x: input.x.map(value => (value > 0 ? 1 : 0)),
  y: input.x.map(value => (value === 0 ? 1 : 0)),
};

export const solution = {
  cycleCount: 43,
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
