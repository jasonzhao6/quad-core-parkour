export default {
  cycleCount: 67,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '1,0': [
      'start: mov up acc',
      'jez end',
      'split: mov 1 right',
      'sum: swp',
      'add up',
      'sav',
      'jmp start',
      'end: mov -99 right',
      'swp',
      'mov acc down',
      'no-op: mov up acc',
    ],
    '1,1': [
      'start: add left',
      'jgz count',
      'end: swp',
      'mov acc down',
      'mov 0 acc',
      'sav',
      'jmp start',
      'count: sav',
    ],
  },
};
