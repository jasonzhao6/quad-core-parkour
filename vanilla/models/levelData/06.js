export const title = 'Accumulator';

export const info = [
  'Sequences are zero-terminated',
  'Read a sequence from in.x',
  'Write the sum to out.x',
  'Write the length to out.y',
];

const sum = arr => arr.slice(0, -1)
  .join().split(',0').map(sequence => sequence.split(',').filter(n => n !== ''))
  .map(sequence => sequence.reduce((acc, n) => acc + parseInt(n, 10), 0));
const count = arr => arr.slice(0, -1)
  .join().split(',0').map(sequence => sequence.split(',').filter(n => n !== ''))
  .map(sequence => sequence.length);

export const input = {
  x: [1, 6, 8, 0, 2, 0, 0, 7, 7, 0],

  /* eslint-disable max-len */
  xBig: [35, 3, 38, 38, 7, 91, 53, 11, 93, 66, 0, 31, 48, 25, 93, 39, 47, 0, 32, 78, 15, 52, 89, 0, 0, 17, 87, 51, 36, 70, 44, 23, 76, 33, 61, 15, 29, 28, 74, 45, 7, 45, 62, 29, 39, 15, 54, 6, 84, 34, 19, 54, 32, 52, 19, 16, 48, 30, 14, 44, 94, 6, 69, 53, 63, 38, 18, 7, 29, 81, 3, 75, 88, 42, 66, 68, 17, 2, 95, 61, 75, 19, 26, 74, 9, 20, 51, 53, 4, 8, 4, 9, 69, 55, 3, 69, 39, 95, 72, 0],
  /* eslint-enable max-len */
};

export const output = {
  x: sum(input.x),
  y: count(input.x),

  xBig: sum(input.xBig),
  yBig: count(input.xBig),
};

export const solution = {
  cycleCount: 67,
  cycleCountBig: 696,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '1,0': [
      'start: mov up acc',
      'jez end',
      'split: mov 1 right',
      'sum: swp',
      'add up',
      'sav',
      'jmp start',
      'end: mov -100 right',
      'swp',
      'mov acc down',
      'no-op: mov up acc',
    ],
    '1,1': [
      'start: add left',
      'jgz count',
      'end: swp',
      'mov acc down',
      'mov 0 acc',
      'sav',
      'jmp start',
      'count: sav',
    ],
  },
};
