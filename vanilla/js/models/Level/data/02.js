export const input = {
  x: [3, 9, 7, 2, 8, 9, 5, 4, 7, 0],
  y: [1, 6, 9, 0, 2, 8, 2, 2, 3, 6],
};

export const output = {
  x: input.x.map((x, i) => x - input.y[i]),
  y: input.x.map((x, i) => input.y[i] - x),
};
