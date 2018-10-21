export default {
  cycleCount: 43,
  lines: {
    '0,0': [
      'mov up down',
    ],
    '1,0': [
      'start: mov up acc',
      'split: mov acc right',
      'jgz true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
    '1,1': [
      'start: mov left acc',
      'jez true',
      'false: mov 0 down',
      'jmp start',
      'true: mov 1 down',
    ],
  },
};
