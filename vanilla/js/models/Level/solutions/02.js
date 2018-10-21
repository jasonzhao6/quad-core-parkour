export default {
  cycleCount: 32,
  lines: {
    '0,0': [
      'a-b: mov up acc',
      'sub right',
      'mov acc down',
    ],
    '0,1': [
      'mov up left',
    ],
    '1,0': [
      'split: mov up acc',
      'mov acc right',
      'mov acc down',
    ],
    '1,1': [
      'negate: mov 0 acc',
      'sub left',
      'mov acc down',
    ],
  },
};
