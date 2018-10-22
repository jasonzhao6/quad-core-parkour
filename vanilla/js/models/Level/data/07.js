export const input = {
  x: [9, -3, -4, 8, -10, -2, -7, 4, 9, 7],
};

export const output = {
  x: input.x.map((x, i) => (Math.abs(x - [0, input.x].flat()[i]) > 9 ? 1 : 0)),
};
