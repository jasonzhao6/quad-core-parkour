export const input = {
  x: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
  y: [1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
};

export const output = {
  y: input.x.map((x, i) => {
    if ([1, input.x].flat()[i] === 0 && x === 1) return 0;
    else if ([1, input.y].flat()[i] === 0 && input.y[i] === 1) return 1;
    return -1;
  }),
};
