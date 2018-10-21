export const input = {
  x: [3, -1, -1, 4, 1, 2, 3, 1, 0, -1],
};

export const output = {
  x: input.x.map(value => (value > 0 ? 1 : 0)),
  y: input.x.map(value => (value === 0 ? 1 : 0)),
};
