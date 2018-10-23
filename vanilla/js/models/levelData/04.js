export const input = {
  x: [7, 6, 6, 8, 0, 8, 8, 2, 5, 5],
  y: [1, -1, 1, -1, -1, 1, 1, -1, -1, -1],
};

export const output = {
  y: input.x.map((x, i) => (input.y[i] > 0 ? x : -x)),
};

export const solution = {
  cycleCount: 47,
  lines: {
    '0,0': [
      'mov up right',
    ],
    '0,1': [
      'start: mov up acc',
      'jgz normal',
      'invert: mov 0 acc',
      'sub left',
      'mov acc down',
      'jmp start',
      'normal: mov left down',
    ],
    '1,1': [
      'mov up down',
    ],
  },
};
