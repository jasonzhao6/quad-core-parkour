export const input = {
  x: [8, 7, 7, 7, 5, 3, 7, 9, 0, 2],
  y: [0, 5, 8, 3, 7, 9, 5, 9, 2, 5],
};

export const output = {
  y: input.x.map((x, i) => {
    const y = input.y[i];
    return x > y ? [x, y, 0] : [y, x, 0];
  }).flat(),
};

export const solution = {
  cycleCount: 93,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc right',
      'mov acc right',
    ],
    '0,1': [
      'start: mov up acc',
      'sav',
      'sub left',
      'jgz y>x',
      'x>y: mov left down',
      'swp',
      'mov acc down',
      'jmp start',
      'y>x: swp',
      'mov acc down',
      'mov left down',
    ],
    '1,1': [
      'reset: mov 2 acc',
      'loop: mov up down',
      'sub 1',
      'jez terminate',
      'jmp loop',
      'terminate: mov 0 down',
    ],
  },
};
