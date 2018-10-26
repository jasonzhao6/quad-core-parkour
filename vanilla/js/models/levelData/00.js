export const info = [
  'Read a value from in.x and write the value to out.x',
  'Read a value from in.y and write the value to out.y',
];

export const input = {
  x: [2, 8, 9, 2, 2, 4, 8, 8, 0, 9],
  y: [3, 1, 0, 0, 4, 1, 1, 2, 7, 6],

  /* eslint-disable max-len */
  xBig: [9, 3, 2, 7, 9, 8, 6, 1, 9, 2, 3, 0, 5, 2, 3, 4, 3, 1, 8, 4, 4, 2, 8, 6, 3, 8, 5, 1, 1, 7, 9, 3, 0, 0, 9, 8, 0, 5, 6, 9, 6, 5, 3, 3, 7, 2, 1, 5, 5, 2, 9, 9, 7, 9, 1, 4, 7, 6, 8, 7, 8, 1, 9, 6, 3, 1, 3, 0, 4, 7, 7, 7, 7, 6, 1, 5, 9, 3, 0, 5, 9, 3, 4, 2, 0, 5, 9, 0, 9, 7, 6, 6, 1, 3, 0, 6, 6, 5, 2, 3],
  yBig: [4, 0, 3, 9, 8, 4, 5, 9, 2, 7, 3, 5, 5, 3, 6, 5, 9, 7, 5, 7, 5, 1, 9, 3, 3, 3, 0, 1, 4, 0, 4, 5, 8, 5, 2, 2, 6, 5, 1, 2, 0, 1, 9, 7, 0, 9, 9, 6, 9, 8, 2, 9, 1, 3, 9, 6, 5, 7, 1, 5, 4, 3, 8, 9, 1, 2, 0, 7, 9, 9, 7, 5, 9, 3, 6, 1, 8, 9, 7, 7, 5, 2, 3, 6, 4, 5, 1, 1, 3, 2, 8, 8, 1, 9, 5, 8, 2, 5, 3, 8],
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
