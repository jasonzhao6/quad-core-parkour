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

export const solution = {
  cycleCount: 155,
  lines: {
    '0,0': [
      'mov up acc',
      'max: mov acc down',
      'mov acc down',
      'mov acc down',
      'jez bypass',
      'sub 99',
      'neg',
      'bypass: mov acc right',
      'mov acc right',
      'mov acc right',
    ],
    '0,1': [
      'start: mov left acc',
      'jez terminate',
      'swp',
      'sav',
      'sub left',
      'jgz keep',
      'replace: mov left acc',
      'sav',
      'jmp start',
      'keep: mov left acc',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov left acc',
      'mov left acc',
    ],
    '1,0': [
      'start: mov up acc',
      'jez terminate',
      'swp',
      'sav',
      'sub up',
      'jgz keep',
      'replace: mov up acc',
      'sav',
      'jmp start',
      'keep: mov up acc',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov up acc',
      'mov up acc',
    ],
    '1,1': [
      'mov up acc',
      'neg',
      'add 99',
      'mov acc down',
    ],
  },
};
