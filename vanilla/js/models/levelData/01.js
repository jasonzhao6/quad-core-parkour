export const input = {
  x: [0, 2, 1, 5, 8, 5, 9, 6, 9, 2],
};

export const output = {
  y: input.x.map(value => value * 2),
};

export const solution = {
  cycleCount: 30,
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
