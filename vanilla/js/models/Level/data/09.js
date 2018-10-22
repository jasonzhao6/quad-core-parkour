export const input = {
  x: [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
};

export const output = {
  x: input.x.map((x, i) => ([
    [1, 1, input.x].flat()[i] === 0,
    [1, 1, input.x].flat()[i + 1] === 0,
    x === 0,
  ].every(condition => condition) ? 1 : 0)),
};
