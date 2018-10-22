export const input = {
  x: [8, 0, 4, 2, 0, 6, 7, 3, 7, 0],
};

export const output = {
  x: input.x.slice(0, -1)
    .join('').split('0').map(sequence => sequence.split(''))
    .map(sequence => Math.max(...sequence.map(n => parseInt(n, 10)))),
  y: input.x.slice(0, -1)
    .join('').split('0').map(sequence => sequence.split(''))
    .map(sequence => Math.min(...sequence.map(n => parseInt(n, 10)))),
};
