export const input = {
  x: [9, 8, 5, 1, 9, 6, 9, 1, 2, 0],
  y: [7, 8, 7, 3, 1, 1, 3, 0, 0, 2],
};

export const output = {
  y: input.y.map(index => input.x[index]),
};

export const solution = {
  cycleCount: 399,
  lines: {
    '0,0': [
      'init: mov 0 above',
      'start: mov up acc',
      'jez reverse',
      'mov acc above',
      'jmp start',
      'reverse: mov above acc',
      'jez terminate',
      'mov acc below',
      'jmp reverse',
      'terminate: mov left acc',
    ],
    '0,1': [
      'init: mov 24 acc',
      'wait: jez start',
      'sub 1',
      'jmp wait',
      'start: mov up down',
      'jmp start',
    ],
    '1,1': [
      'start: mov up acc',
      'mov 0 above',
      'destack: jez output',
      'mov below above',
      'sub 1',
      'jmp destack',
      'output: mov below acc',
      'mov acc down',
      'mov acc below',
      'restack: mov above acc',
      'jez start',
      'mov acc below',
      'jmp restack',
    ],
  },
};
