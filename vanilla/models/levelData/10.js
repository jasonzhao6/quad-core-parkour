export const title = 'MinMaxer';

export const info = [
  'Sequences are zero-terminated',
  'Read a sequence from in.x',
  'Write the max value to out.x',
  'Write the min value to out.y',
];

const minMax = arr => arr.slice(0, -1)
  .join().split(',0').map(sequence => sequence.split(',').filter(n => n !== ''))
  .map(sequence => sequence.map(n => parseInt(n, 10)))
  .map(sequence => sequence.reduce((acc, n) =>
    [Math.min(acc[0], n), Math.max(acc[1], n)], [sequence[0] || 0, sequence[0] || 0]));

export const input = {
  x: [8, 0, 0, 4, 2, 0, 6, 7, 7, 0],

  /* eslint-disable max-len */
  xBig: [57, 68, 98, 41, 67, 82, 49, 91, 34, 96, 32, 41, 48, 74, 96, 86, 81, 11, 78, 16, 49, 80, 0, 96, 52, 49, 82, 78, 96, 33, 79, 63, 43, 9, 89, 48, 67, 66, 66, 96, 44, 11, 68, 98, 3, 23, 64, 52, 78, 53, 99, 27, 98, 14, 97, 94, 92, 68, 21, 7, 97, 99, 0, 65, 41, 71, 0, 29, 26, 12, 5, 87, 5, 69, 12, 23, 78, 9, 87, 94, 12, 29, 12, 0, 49, 95, 64, 31, 30, 38, 34, 79, 60, 89, 61, 13, 80, 22, 0, 0],
  /* eslint-enable max-len */
};

export const output = {
  x: minMax(input.x).map(sequence => sequence[1]),
  y: minMax(input.x).map(sequence => sequence[0]),

  xBig: minMax(input.xBig).map(sequence => sequence[1]),
  yBig: minMax(input.xBig).map(sequence => sequence[0]),
};

export const solution = {
  cycleCount: 154,
  cycleCountBig: 1588,
  lines: {
    '0,0': [
      'mov up acc',
      'max: mov acc down',
      'mov acc down',
      'mov acc down',
      'jez bypass',
      'sub 100',
      'neg',
      'bypass: mov acc right',
      'mov acc right',
      'mov acc right',
    ],
    '0,1': [
      'start: mov left acc',
      'jez terminate',
      'swp',
      'sav',
      'sub left',
      'jgz keep',
      'replace: mov left acc',
      'sav',
      'jmp start',
      'keep: mov left acc',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov left acc',
      'mov left acc',
    ],
    '1,0': [
      'start: mov up acc',
      'jez terminate',
      'swp',
      'sav',
      'sub up',
      'jgz keep',
      'replace: mov up acc',
      'sav',
      'jmp start',
      'keep: mov up acc',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov up acc',
      'mov up acc',
    ],
    '1,1': [
      'mov up acc',
      'jez bypass',
      'neg',
      'add 100',
      'bypass: mov acc down',
    ],
  },
};
