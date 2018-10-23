export const input = {
  x: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
};

export const output = {
  x: input.x.map((x, i) => ([
    [1, 1, input.x].flat()[i] === 0,
    [1, 1, input.x].flat()[i + 1] === 0,
    x === 0,
  ].every(condition => condition) ? 1 : 0)),
};

export const solution = {
  cycleCount: 62,
  lines: {
    '0,0': [
      'mov up acc',
      'jez inc',
      'mov 0 acc',
      'jmp next',
      'inc: swp',
      'add 1',
      'next: mov acc down',
      'sav',
    ],
    '1,0': [
      'start: mov up acc',
      'sub 2',
      'jgz true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
  },
};
