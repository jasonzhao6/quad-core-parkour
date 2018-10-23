export const input = {
  x: [7, 4, 1, 5, 6, 2, 5, 8, 5, 5],
  y: [2, 6, 8, 2, 5, 1, 4, 2, 8, 0],
};

export const output = {
  y: input.x.map((x, i) => x * input.y[i]),
};
