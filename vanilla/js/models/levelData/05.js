export const info = [
  'Read values from in.x and in.y',
  'Write the smaller value to out.y',
  'Write the bigger value to out.y',
  'Write 0 to out.y to signal done',
];

const compare = (arr1, arr2) => arr1.map((a, i) => {
  const b = arr2[i];
  return a > b ? [a, b, 0] : [b, a, 0];
}).flat();

export const input = {
  x: [8, 7, 7, 7, 5, 3, 7, 9, 0, 2],
  y: [0, 5, 8, 3, 7, 9, 5, 9, 2, 5],

  /* eslint-disable max-len */
  xBig: [49, 65, 97, 12, 38, 73, 99, 46, 59, 69, 18, 10, 39, 25, 83, 0, 7, 40, 73, 58, 60, 51, 32, 47, 25, 20, 64, 29, 36, 42, 57, 62, 47, 90, 92, 9, 69, 99, 33, 99, 62, 43, 33, 1, 48, 72, 32, 5, 92, 59, 11, 68, 81, 67, 99, 95, 21, 74, 27, 67, 8, 75, 8, 4, 89, 0, 16, 97, 41, 41, 36, 74, 93, 42, 76, 80, 87, 83, 19, 48, 53, 65, 91, 73, 80, 55, 72, 56, 26, 19, 36, 29, 36, 97, 14, 55, 69, 62, 45, 10],
  yBig: [50, 89, 15, 61, 53, 35, 44, 17, 66, 69, 53, 12, 26, 58, 37, 65, 20, 6, 72, 96, 40, 23, 1, 12, 81, 95, 1, 99, 74, 21, 38, 29, 11, 56, 96, 86, 71, 96, 20, 18, 63, 22, 56, 78, 29, 38, 85, 98, 89, 21, 76, 34, 73, 2, 9, 18, 28, 25, 21, 21, 32, 68, 79, 54, 50, 89, 35, 8, 91, 5, 91, 51, 20, 89, 45, 10, 75, 29, 92, 32, 13, 73, 91, 11, 19, 85, 98, 94, 57, 36, 18, 82, 66, 21, 59, 77, 15, 37, 81, 90],
  /* eslint-enable max-len */
};

export const output = {
  y: compare(input.x, input.y),

  yBig: compare(input.xBig, input.yBig),
};

export const solution = {
  cycleCount: 93,
  cycleCountBig: 904,
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
