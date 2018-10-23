export const input = {
  x: [2, 3, 4, 5, 4, 5, 5, 3, 3, 9],
};

export const output = {
  x: input.x.map((x, i) =>
    [0, 0, 0, 0, input.x].flat().slice(i, i + 5).reduce((a, b) => a + b)),
};

export const solution = {
  cycleCount: 40,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc right',
      'mov acc right',
    ],
    '0,1': [
      'pass-through: mov left down',
      'delay-2x: swp',
      'mov acc down',
      'mov left acc',
    ],
    '1,0': [
      'slide: add right',
      'mov acc down',
      'sub right',
    ],
    '1,1': [
      'pass-through: mov up left',
      'delay-2x: swp',
      'mov acc left',
      'mov up acc',
    ],
  },
};
