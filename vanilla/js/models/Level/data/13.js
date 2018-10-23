export const input = {
  x: [6, 5, 6, 7, 1, 0, 7, 9, 2, 9],
  y: [2, 3, 3, 1, 2, 4, 2, 3, 2, 4],
};

export const output = {
  x: input.x.map((x, i) => parseInt(x / input.y[i], 10)),
  y: input.x.map((x, i) => x % input.y[i]),
};

export const solution = {
  cycleCount: 277,
  lines: {
    '0,0': [
      'start: mov up acc',
      'divide: sub right',
      'jgz more',
      'jez more',
      'mov 1 right',
      'mov 0 down',
      'add right',
      'mov 0 right',
      'mov acc right',
      'jmp start',
      'more: mov 1 right',
      'mov 1 down',
      'jmp divide',
    ],
    '0,1': [
      'mov up acc',
      'mov acc left',
      'sav',
      'divide: mov left acc',
      'jez remainder',
      'swp',
      'mov acc left',
      'swp',
      'jmp divide',
      'remainder: mov left down',
    ],
    '1,0': [
      'start: mov up acc',
      'jez quotient',
      'swp',
      'add 1',
      'swp',
      'jmp start',
      'quotient: swp',
      'mov acc down',
    ],
    '1,1': [
      'mov up down',
    ],
  },
};
