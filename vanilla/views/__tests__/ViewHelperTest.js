import BoxView from '../ViewHelper/BoxView.js';
import { singleton as subject } from '../ViewHelper.js';

export default class ViewHelperTest {
  static enqueue(_) {
    _.Class('ViewHelper', () => {
      _.method('#constructor / #reset', () => {
        _.assert(
          'It initializes a `store` registry with at least 1 registered slice',
          () => Object.keys(subject.store).length >= 1,
        );

        _.assert(
          'It initializes each registered slice in the `store` to `{}`',
          () => Object.keys(subject.reset().store)
            .map(key => Object.keys(subject.store[key]).length === 0),
        );

        _.assert(
          'It initializes `entryPoint` to `null`',
          () => subject.reset().entryPoint === null,
        );

        _.assert(
          'It initializes `eventsToBind` to `[]`',
          () => [
            subject.eventsToBind instanceof Array,
            subject.reset().eventsToBind.length === 0,
          ],
        );
      });

      _.method('#update', () => {
        const slice = 'modes';
        const props = { key: 'value' };

        _.context('When updating a slice not registered with store', () => {
          const errors = [];

          try {
            subject.update('unregistered slice');
          } catch (error) {
            errors.push(error);
          } finally {
            _.assert(
              'It throws a Error',
              () => [errors.length === 1, errors[0] instanceof Error],
            );
          }
        });

        _.context('When updating a slice registered with store', () => {
          const subjectProxy = _.proxy(subject);
          _.allow(subjectProxy).toReceive('renderDom').andReturn();

          _.assert(
            'It updates the store',
            () => subjectProxy.update(slice, props).modes.key === 'value',
          );
        });

        _.context('When `entryPoint` is not set', () => {
          const subjectProxy = _.proxy(subject);
          _.allow(subjectProxy).toReceive('renderDom');

          subjectProxy.entryPoint = null;
          subjectProxy.update(slice, props);
          _.expect(subjectProxy).toHaveReceived('renderDom').nTimes(0);

          _.assert(
            'It does not call `renderDom`',
            () => subjectProxy.isAsExpected(),
          );
        });

        _.context('When `entryPoint` is set', () => {
          const subjectProxy = _.proxy(subject);
          _.allow(subjectProxy).toReceive('renderDom').andReturn();

          subjectProxy.entryPoint = 'entry point';
          subjectProxy.update(slice, props);
          _.expect(subjectProxy).toHaveReceived('renderDom').nTimes(1);

          _.assert(
            'It calls `renderDom`',
            () => subjectProxy.isAsExpected(),
          );
        });
      });

      _.method('#enqueue', () => {
        const view = {
          EVENTS: [
            ['class1', 'event1', 'callback1'],
            ['class2', 'event2', 'callback2'],
          ],
        };

        _.assert(
          'It calls `EVENTS` from the view argument',
          () => subject.enqueue(view).filter((eventToBind) => {
            const [viewArg, className, event, callback] = eventToBind;
            return viewArg === view &&
              ['class1', 'class2'].includes(className) &&
              ['event1', 'event2'].includes(event) &&
              ['callback1', 'callback2'].includes(callback);
          }).length === 2,
        );
      });

      _.method('#bindEvents', () => {
        const view = { key: 'value' };
        const className = 'className';
        const event = 'event';
        const callback = 'key';

        const documentProxy = _.proxy({ getElementsByClassName: null });
        const domElement = {};

        _.allow(documentProxy)
          .toReceive('getElementsByClassName')
          .andReturn([domElement]);

        subject.eventsToBind = [[view, className, event, callback]];
        subject.bindEvents(documentProxy);

        _.expect(documentProxy)
          .toHaveReceived('getElementsByClassName')
          .withArgs(className);

        _.assert(
          'It gets elements from the DOM',
          () => documentProxy.isAsExpected(),
        );

        _.assert(
          'It binds events to elements',
          () => domElement[event] === view[callback],
        );
      });

      _.method('#render / #extract', () => {
        _.context('When view has `TEMPLATE` only', () => {
          const view = { TEMPLATE: 'template' };
          const mustacheProxy = _.proxy({ render: null });

          _.allow(mustacheProxy).toReceive('render').andReturn();
          subject.render(view, mustacheProxy);
          _.expect(mustacheProxy)
            .toHaveReceived('render')
            .withArgs([view.TEMPLATE, {}, {}]);

          _.assert(
            'It uses `TEMPLATE` and defaults `context` and `partials` to `{}`',
            () => mustacheProxy.isAsExpected(),
          );
        });

        _.context('When view has it all: `TEMPLATES/context/partials`', () => {
          const view = {
            TEMPLATE: 'template',
            context: () => 'context',
            partials: () => 'partials',
          };
          const mustacheProxy = _.proxy({ render: null });

          _.allow(mustacheProxy).toReceive('render').andReturn();
          subject.render(view, mustacheProxy);
          _.expect(mustacheProxy)
            .toHaveReceived('render')
            .withArgs([view.TEMPLATE, 'context', 'partials']);

          _.assert(
            'It uses it all: `TEMPLATE/context/partials`',
            () => mustacheProxy.isAsExpected(),
          );
        });
      });

      _.method('#renderBox', () => {
        const view = { TEMPLATE: 'template', context: () => 'context' };
        const boxConfigArg = 'boxConfig';
        const expectedArgs = {};
        class BoxViewOverride {
          constructor(template, context, boxConfig) {
            expectedArgs.template = template;
            expectedArgs.context = context;
            expectedArgs.boxConfig = boxConfig;
          }
          render() { return 'render'; }
        }

        const boxView = subject.renderBox(view, boxConfigArg, BoxViewOverride);

        _.assert(
          'It creates a new BoxView with proper arguments',
          () => [
            expectedArgs.template === view.TEMPLATE,
            expectedArgs.context === view.context(),
            expectedArgs.boxConfig === boxConfigArg,
          ],
        );

        _.assert(
          'It returns BoxView rendered to string',
          () => boxView === 'render',
        );
      });

      _.method('#renderDom', () => {
        const view = 'view';

        _.context('When called with `view` argument', () => {
          const documentOverride = { body: {} };
          const subjectProxy = _.proxy(subject);
          _.allow(subjectProxy).toReceive('render').andReturn(view);
          _.allow(subjectProxy).toReceive('bindEvents').andReturn();

          subjectProxy.renderDom(view, documentOverride);
          const memoizedEntryPoint = subjectProxy.entryPoint;
          _.expect(subjectProxy).toHaveReceived('render').withArgs(view);
          _.expect(subjectProxy).toHaveReceived('bindEvents');

          _.assert(
            'It memoizes the view argument',
            () => memoizedEntryPoint === view,
          );

          _.assert(
            'It updates DOM with rendered string',
            () => documentOverride.body.innerHTML === view,
          );

          _.assert(
            'It calls `render` and `bindEvents` methods',
            () => subjectProxy.isAsExpected(),
          );
        });

        _.context('When called without `view` argument', () => {
          const documentOverride = { body: {} };
          const subjectProxy = _.proxy(subject);
          _.allow(subjectProxy).toReceive('render').andReturn(view);
          _.allow(subjectProxy).toReceive('bindEvents').andReturn();

          subjectProxy.entryPoint = view;
          subjectProxy.renderDom(undefined, documentOverride);
          _.expect(subjectProxy).toHaveReceived('render').withArgs(view);
          _.expect(subjectProxy).toHaveReceived('bindEvents');

          _.assert(
            'It updates DOM with rendered string',
            () => documentOverride.body.innerHTML === view,
          );

          _.assert(
            'It calls `render` and `bindEvents` methods',
            () => subjectProxy.isAsExpected(),
          );
        });
      });

      _.method('#wrap', () => {
        const template = 'template';

        _.assert(
          'It returns a view whose `TEMPLATE` is the argument passed in',
          () => subject.wrap(template).TEMPLATE === template,
        );
      });

      _.method('#BOX_LAYOUTS', () => {
        _.assert(
          'It delegates to BoxView',
          () => subject.BOX_LAYOUTS.toString() === BoxView.LAYOUTS.toString(),
        );
      });

      _.method('#paint', () => {
        // TODO
      });

      _.method('#paintDemo', () => {
        // TODO
      });
    });
  }
}
