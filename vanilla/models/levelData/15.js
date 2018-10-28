export const title = 'Indexer';

export const info = [
  'Read the sequence from in.x',
  'Sequence is zero-terminated',
  'Read an index number from in.y',
  'Write sequence[index] to out.y',
];

const index = (arr1, arr2) => arr2.map(i => arr1[i]);

export const input = {
  x: [9, 8, 5, 1, 9, 6, 9, 1, 2, 0],
  y: [7, 8, 7, 3, 1, 1, 3, 0, 0, 2],

  /* eslint-disable max-len */
  xBig: [39, 39, 16, 88, 97, 33, 93, 45, 61, 90, 67, 32, 54, 74, 94, 84, 18, 67, 54, 9, 54, 62, 39, 7, 27, 47, 14, 65, 66, 95, 99, 79, 63, 5, 97, 47, 21, 67, 67, 99, 76, 57, 56, 20, 43, 37, 42, 67, 78, 89, 31, 85, 82, 21, 18, 88, 2, 18, 10, 71, 40, 28, 38, 59, 49, 49, 12, 5, 71, 59, 28, 60, 77, 2, 46, 68, 20, 8, 60, 35, 79, 66, 51, 99, 92, 58, 5, 31, 53, 56, 45, 34, 34, 79, 38, 69, 67, 79, 24, 0],
  yBig: [1, 70, 45, 77, 18, 51, 77, 98, 85, 73, 56, 51, 0, 0, 0, 59, 76, 72, 43, 53],
  /* eslint-enable max-len */
};

export const output = {
  y: index(input.x, input.y),

  yBig: index(input.xBig, input.yBig),
};

export const solution = {
  cycleCount: 403,
  cycleCountBig: 8783,
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
      'terminate: mov 0 right',
      'mov left acc',
    ],
    '0,1': [
      'init: mov left acc',
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
