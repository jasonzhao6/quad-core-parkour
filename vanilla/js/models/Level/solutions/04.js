export default {
  cycleCount: 47,
  lines: {
    '0,0': [
      'mov up right',
    ],
    '0,1': [
      'start: mov up acc',
      'jgz normal',
      'invert: mov 0 acc',
      'sub left',
      'mov acc down',
      'jmp start',
      'normal: mov left down',
    ],
    '1,1': [
      'mov up down',
    ],
  },
};
