export default {
  cycleCount: 356,
  lines: {
    '0,0': [
      'mov up right',
    ],
    '0,1': [
      'mov up acc',
      'sav',
      'mov left acc',
      'multiply: jez terminate',
      'sub 1',
      'swp',
      'mov acc down',
      'mov acc down',
      'swp',
      'jmp multiply',
      'terminate: mov 0 down',
    ],
    '1,1': [
      'start: mov up acc',
      'jez terminate',
      'swp',
      'add up',
      'swp',
      'jmp start',
      'terminate: swp',
      'mov acc down',
      'mov 0 acc',
      'sav',
    ],
  },
};
