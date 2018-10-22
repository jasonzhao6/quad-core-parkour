export default {
  cycleCount: 63,
  lines: {
    '0,0': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '0,1': [
      'duplicate: mov up acc',
      'mov acc down',
      'mov acc down',
    ],
    '1,0': [
      'init: mov 1 acc',
      'start: sub up',
      'jez false',
      'jgz false',
      'true: mov 0 right',
      'jmp prep',
      'false: mov -1 right',
      'prep: mov up acc',
      'jmp start',
    ],
    '1,1': [
      'init: mov 1 acc',
      'start: sub up',
      'jez false',
      'jgz false',
      'true: mov 1 down',
      'mov left acc',
      'jmp prep',
      'false: mov left down',
      'prep: mov up acc',
      'jmp start',
    ],
  },
};
