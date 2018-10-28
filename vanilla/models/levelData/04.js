export const title = 'Inverter';

export const info = [
  'Read values from in.x and in.y',
  'Write in.x to out.y if in.y = 1',
  'Write -in.x to out.y if in.y = -1',
];

const maybeNegate = (arr1, arr2) => arr1.map((n, i) => (arr2[i] > 0 ? n : -n));

export const input = {
  x: [7, 6, 6, 8, 0, 8, 8, 2, 5, 5],
  y: [1, -1, 1, -1, -1, 1, 1, -1, -1, -1],

  /* eslint-disable max-len */
  xBig: [67, 65, 77, 37, 99, 60, 46, 45, 58, 52, 59, 40, 90, 49, 71, 92, 18, 80, 60, 22, 9, 18, 25, 37, 13, 61, 86, 79, 99, 14, 53, 75, 49, 96, 71, 44, 98, 45, 54, 16, 92, 8, 69, 35, 30, 31, 84, 52, 7, 86, 48, 31, 94, 88, 95, 6, 18, 55, 82, 79, 7, 97, 70, 22, 69, 19, 71, 80, 30, 22, 28, 2, 6, 27, 19, 17, 18, 37, 45, 8, 56, 0, 38, 10, 74, 83, 23, 92, 99, 38, 56, 23, 76, 36, 1, 48, 79, 43, 87, 1],
  yBig: [-1, 1, 1, -1, 1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, 1, 1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1],
  /* eslint-enable max-len */
};

export const output = {
  y: maybeNegate(input.x, input.y),

  yBig: maybeNegate(input.xBig, input.yBig),
};

export const solution = {
  cycleCount: 47,
  cycleCountBig: 455,
  lines: {
    '0,0': [
      'mov up right',
    ],
    '0,1': [
      'start: mov up acc',
      'jgz normal',
      'invert: mov 0 acc',
      'sub left',
      'mov acc down',
      'jmp start',
      'normal: mov left down',
    ],
    '1,1': [
      'mov up down',
    ],
  },
};
