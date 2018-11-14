import InView from '../InView.js';

export default class InViewTest {
  static enqueue(_) {
    _.Class('InView', () => {
      _.method('#constructor', () => {
        _.context('When array is shorter than `MAX_COUNT`', () => {
          const [label, array, index] = ['label', [1, 2, 3], 'index'];
          const subject = new InView(label, array, index);

          _.assert(
            'It initializes all the props',
            () => [
              subject.label === label,
              subject.array.join() === array.join(),
              subject.index === index,
            ],
          );
        });

        _.context('When array is longer than `MAX_COUNT`', () => {
          const array = new Array(InView.MAX_COUNT * 2);
          [...array.keys()].forEach((i) => { array[i] = i; });
          const subject = new InView(undefined, array, undefined);

          _.assert(
            'It initializes the `array` prop with up to `MAX_COUNT` elements',
            () => [
              subject.array.length === InView.MAX_COUNT,
              subject.array.join() ===
                array.slice(0, InView.MAX_COUNT).join(),
            ],
          );
        });
      });
    });
  }
}
