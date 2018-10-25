export const input = {
  x: [3, 5, 1, 7, 7, 9, 0, 0, 4, 0],
};

export const output = {
  x: input.x.slice(0, -1)
    .join('').split('0').map(sequence => sequence.split(''))
    .map(sequence => [...sequence.reverse(), 0])
    .flat()
    .map(n => parseInt(n, 10)),
};

export const solution = {
  cycleCount: 81,
  lines: {
    '0,0': [
      'init: mov 0 above',
      'start: mov up acc',
      'jez output',
      'stack: mov acc above',
      'jmp start',
      'output: mov 0 down',
      'wait: mov down acc',
    ],
    '1,0': [
      'mov up acc',
      'output: mov above acc',
      'jez terminate',
      'mov acc down',
      'jmp output',
      'terminate: mov 0 down',
      'mov 0 up',
    ],
  },
};
