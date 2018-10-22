export default {
  cycleCount: 67,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '1,0': [
      'start: sub up',
      'jgz positive',
      'negative: add 10',
      'jgz false',
      'jmp true',
      'positive: sub 9',
      'compare: jgz true',
      'false: mov 0 down',
      'jmp prep',
      'true: mov 1 down',
      'prep: mov up acc',
    ],
  },
};
