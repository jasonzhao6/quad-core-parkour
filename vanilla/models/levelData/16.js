export const title = 'Sorter';

export const info = [
  'Sequences are zero-terminated',
  'Read a sequence from in.x',
  'Sort it, then write it to out.x',
];

const sort = arr => arr.slice(0, -1)
  .join().split(',0').map(sequence => sequence.split(',').filter(n => n !== ''))
  .map(sequence => sequence.map(n => parseInt(n, 10)))
  .map(sequence => [...sequence.sort((a, b) => a - b), 0])
  .flat();

export const input = {
  x: [1, 6, 7, 8, 7, 4, 8, 9, 0, 0],

  /* eslint-disable max-len */
  xBig: [58, 2, 29, 53, 76, 30, 16, 88, 80, 69, 0, 0, 0, 0, 95, 22, 37, 4, 71, 27, 24, 38, 85, 99, 71, 45, 94, 54, 89, 95, 2, 5, 65, 56, 1, 22, 7, 11, 81, 0],
  /* eslint-enable max-len */
};

export const output = {
  x: sort(input.x),

  xBig: sort(input.xBig),
};

export const solution = {
  cycleCount: 357,
  cycleCountBig: 5697,
  lines: {
    '0,0': [
      'init: mov 0 above',
      'start: mov up acc',
      'jez terminate',
      'mov acc above',
      'jmp start',
      'terminate: mov 0 right',
      'mov 100 below',
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
      'sub 100',
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
