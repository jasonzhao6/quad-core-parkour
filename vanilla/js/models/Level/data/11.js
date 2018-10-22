export const input = {
  x: [2, 3, 4, 5, 4, 5, 5, 3, 3, 9],
};

export const output = {
  x: input.x.map((x, i) =>
    [0, 0, 0, 0, input.x].flat().slice(i, i + 5).reduce((a, b) => a + b)),
};
