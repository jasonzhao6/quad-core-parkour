export const title = 'Tutorial';

export const info = [
  'Read a value from in.x and write the value to out.x',
  'Read a value from in.y and write the value to out.y',
];

export const input = {
  x: [2, 8, 9, 2, 2, 4, 8, 8, 0, 9],
  y: [3, 1, 0, 0, 4, 1, 1, 2, 7, 6],

  /* eslint-disable max-len */
  xBig: [31, 95, 9, 15, 78, 37, 17, 5, 43, 77, 15, 82, 14, 35, 1, 56, 30, 76, 22, 29, 15, 84, 70, 13, 98, 59, 36, 31, 69, 30, 39, 86, 3, 67, 14, 47, 96, 18, 70, 22, 15, 34, 40, 86, 68, 86, 98, 9, 67, 75, 37, 86, 37, 36, 77, 51, 64, 31, 47, 29, 39, 80, 83, 90, 22, 14, 92, 30, 19, 46, 49, 39, 38, 11, 62, 28, 64, 99, 89, 95, 33, 28, 41, 11, 9, 59, 47, 29, 47, 70, 80, 61, 23, 51, 65, 12, 41, 11, 88, 78],
  // TODO
  // xBig: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  yBig: [56, 57, 62, 55, 75, 84, 42, 12, 21, 58, 89, 27, 1, 40, 22, 99, 91, 11, 79, 39, 36, 27, 62, 79, 37, 81, 83, 66, 92, 64, 62, 26, 70, 88, 9, 16, 18, 84, 26, 31, 41, 58, 21, 96, 2, 42, 25, 98, 73, 82, 3, 76, 80, 66, 49, 79, 7, 13, 4, 23, 63, 91, 50, 45, 60, 47, 91, 23, 99, 76, 75, 85, 50, 57, 28, 75, 98, 62, 34, 56, 50, 46, 84, 15, 75, 44, 97, 37, 95, 7, 14, 81, 24, 58, 96, 29, 23, 35, 86, 30],
  /* eslint-enable max-len */
};

export const output = {
  x: input.x,
  y: input.y,

  xBig: input.xBig,
  yBig: input.yBig,
};

export const solution = {
  cycleCount: 10,
  cycleCountBig: 100,
  lines: {
    '0,0': ['mov up down'],
    '0,1': ['mov up down'],
    '1,0': ['mov up down'],
    '1,1': ['mov up down'],
  },
};
