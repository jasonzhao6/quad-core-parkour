export const input = {
  x: [7, 4, 1, 5, 6, 2, 5, 8, 5, 5],
  y: [2, 6, 8, 2, 5, 1, 4, 2, 8, 0],
};

export const output = {
  y: input.x.map((x, i) => x * input.y[i]),
};

export const solution = {
  cycleCount: 356,
  lines: {
    '0,0': [
      'mov up right',
    ],
    '0,1': [
      'mov up acc',
      'sav',
      'mov left acc',
      'multiply: jez terminate',
      'sub 1',
      'swp',
      'mov acc down',
      'mov acc down',
      'swp',
      'jmp multiply',
      'terminate: mov 0 down',
    ],
    '1,1': [
      'start: mov up acc',
      'jez terminate',
      'swp',
      'add up',
      'swp',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov 0 acc',
      'sav',
    ],
  },
};
