export const input = {
  x: [9, -3, -4, 8, -10, -2, -7, 4, 9, 7],
};

export const output = {
  x: input.x.map((x, i) => (Math.abs(x - [0, input.x].flat()[i]) > 9 ? 1 : 0)),
};

export const solution = {
  cycleCount: 67,
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
