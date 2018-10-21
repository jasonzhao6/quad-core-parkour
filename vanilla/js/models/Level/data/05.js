export const input = {
  x: [8, 7, 7, 7, 5, 3, 7, 9, 0, 2],
  y: [0, 5, 8, 3, 7, 9, 5, 9, 2, 5],
};

export const output = {
  y: input.x.map((x, i) => {
    const y = input.y[i];
    return x > y ? [x, y, 0] : [y, x, 0];
  }).flat(),
};
