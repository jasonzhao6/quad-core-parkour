import InView from '../InView.js';

export default class InViewTest {
  static enqueue(_) {
    _.Class('InView', () => {
      _.method('#constructor', () => {
        _.context('When all params are present', () => {
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

        _.context('When params are not present', () => {
          const subject = new InView();

          _.assert(
            'It initializes `array` to empty array',
            () => [
              subject.array instanceof Array,
              subject.array.length === 0,
            ],
          );
        });
      });

      _.method('#context', () => {
        const label = '_label';
        const arr = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        ];

        _.context('When index is at start', () => {
          const subject = new InView(label, arr, 0).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 1` elements starting from 0',
            () => subject === arr.slice(0, InView.MAX_COUNT - 1).join(),
          );
        });

        _.context('When index is at starting SCROLL_OFFSET', () => {
          const index = InView.MAX_COUNT - InView.SCROLL_OFFSET - 1;
          const subject = new InView(label, arr, index).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 1` elements starting from 0',
            () => subject === arr.slice(0, InView.MAX_COUNT - 1).join(),
          );
        });

        _.context('When index is 1 past starting SCROLL_OFFSET', () => {
          const index = InView.MAX_COUNT - InView.SCROLL_OFFSET;
          const subject = new InView(label, arr, index).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 2` elements starting from 2',
            () => subject === arr.slice(2, InView.MAX_COUNT).join(),
          );
        });

        _.context('When index is at MAX_COUNT', () => {
          const index = InView.MAX_COUNT;
          const subject = new InView(label, arr, index).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 2` elements with index at `SCROLL_OFFSET`',
            () => subject === arr.slice(
              InView.SCROLL_OFFSET + 2,
              InView.MAX_COUNT + InView.SCROLL_OFFSET,
            ).join(),
          );
        });

        _.context('When index is 1 before ending SCROLL_OFFSET', () => {
          const index = arr.length - 1 - InView.SCROLL_OFFSET - 1;
          const subject = new InView(label, arr, index).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 2` elements ending at -2 exclusive',
            () => subject === arr.slice(
              arr.length - InView.MAX_COUNT,
              arr.length - 2,
            ).join(),
          );
        });

        _.context('When index is at ending SCROLL_OFFSET', () => {
          const index = arr.length - 1 - InView.SCROLL_OFFSET;
          const subject = new InView(label, arr, index).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 1` elements ending at last element',
            () => subject === arr.slice(
              (arr.length - InView.MAX_COUNT) + 1,
              arr.length,
            ).join(),
          );
        });

        _.context('When index is at the end', () => {
          const index = arr.length - 1;
          const subject = new InView(label, arr, index).context().array.join();

          _.assert(
            'It returns `MAX_COUNT - 1` elements ending at last element',
            () => subject === arr.slice(
              (arr.length - InView.MAX_COUNT) + 1,
              arr.length,
            ).join(),
          );
        });
      });
    });
  }
}
