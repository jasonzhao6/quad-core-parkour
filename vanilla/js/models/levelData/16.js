export const input = {
  x: [1, 6, 7, 8, 7, 4, 8, 9, 0, 0],
};

export const output = {
  x: input.x.slice(0, -1)
    .join('').split('0').map(sequence => sequence.split(''))
    .map(sequence => [...sequence.sort(), 0])
    .flat()
    .map(n => parseInt(n, 10)),
};

export const solution = {
  cycleCount: 357,
  lines: {
    '0,0': [
      'init: mov 0 above',
      'start: mov up acc',
      'jez terminate',
      'mov acc above',
      'jmp start',
      'terminate: mov 0 right',
      'mov 99 below',
      'wait1: mov right acc',
      'mov 0 down',
      'wait2: mov down acc',
    ],
    '0,1': [
      'wait: mov left acc',
      'sort: mov down acc',
      'mov above acc',
      'jez output',
      'mov below down',
      'mov acc down',
      'mov acc down',
      'jmp sort',
      'output: mov 0 left',
      'mov 0 down',
    ],
    '1,0': [
      'wait: mov up acc',
      'output: mov below acc',
      'sav',
      'sub 99',
      'jez terminate',
      'swp',
      'mov acc down',
      'jmp output',
      'terminate: mov 0 down',
      'mov 0 up',
    ],
    '1,1': [
      'compare: mov 0 up',
      'wait: mov up acc',
      'jez compare',
      'sav',
      'sub up',
      'jez good',
      'jgz good',
      'bad: swp',
      'mov acc above',
      'mov up above',
      'jmp compare',
      'good: swp',
      'mov acc below',
      'mov up below',
    ],
  },
};
