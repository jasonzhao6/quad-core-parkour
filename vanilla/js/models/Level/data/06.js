export const input = {
  x: [1, 6, 8, 0, 2, 0, 0, 7, 7, 0],
};

export const output = {
  x: input.x.slice(0, -1)
    .join('').split('0').map(sequence => sequence.split(''))
    .map(sequence => sequence.reduce((acc, n) => acc + parseInt(n, 10), 0)),
  y: input.x.slice(0, -1)
    .join('').split('0').map(sequence => sequence.split(''))
    .map(sequence => sequence.length),
};
