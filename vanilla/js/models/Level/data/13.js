export const input = {
  x: [6, 5, 6, 7, 1, 0, 7, 9, 2, 9],
  y: [2, 3, 3, 1, 2, 4, 2, 3, 2, 4],
};

export const output = {
  x: input.x.map((x, i) => parseInt(x / input.y[i], 10)),
  y: input.x.map((x, i) => x % input.y[i]),
};
