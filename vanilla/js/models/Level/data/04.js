export const input = {
  x: [7, 6, 6, 8, 0, 8, 8, 2, 5, 5],
  y: [1, -1, 1, -1, -1, 1, 1, -1, -1, -1],
};

export const output = {
  y: input.x.map((x, i) => (input.y[i] > 0 ? x : -x)),
};