export default {
  cycleCount: 62,
  lines: {
    '0,0': [
      'mov up acc',
      'jez inc',
      'mov 0 acc',
      'jmp next',
      'inc: swp',
      'add 1',
      'next: mov acc down',
      'sav',
    ],
    '1,0': [
      'start: mov up acc',
      'sub 2',
      'jgz true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
  },
};
