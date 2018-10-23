export const input = {
  x: [2, 8, 9, 2, 2, 4, 8, 8, 0, 9],
  y: [3, 1, 0, 0, 4, 1, 1, 2, 7, 6],
};

export const output = {
  x: input.x,
  y: input.y,
};

export const solution = {
  cycleCount: 10,
  lines: {
    '0,0': ['mov up down'],
    '0,1': ['mov up down'],
    '1,0': ['mov up down'],
    '1,1': ['mov up down'],
  },
};
