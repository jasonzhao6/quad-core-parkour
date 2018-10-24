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
  cycleCount: 92,
  lines: {
    '0,0': [
      'start: mov up acc',
      'jez output',
      'stack: mov acc above',
      'count: swp',
      'add 1',
      'sav',
      'jmp start',
      'output: swp',
      'mov acc down',
      'wait: mov down acc',
    ],
    '1,0': [
      'mov up acc',
      'jez terminate',
      'reverse: sub 1',
      'mov above down',
      'jgz reverse',
      'terminate: mov 0 down',
      'mov 0 up',
    ],
  },
};
