import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import useDebounced from '../src/hooks/useDebounced';
import useEvent from '../src/hooks/useDOMSpy';
import useThrottled from '../src/hooks/useThrottled';

const stories = storiesOf('Hooks', module);
stories.addDecorator(withKnobs({ escapeHTML: false }));

const Debounced = () => {
  const [value, setValue] = useDebounced(0, 3000);
  console.count('example debounced');
  return (
    <button type="button" onClick={() => setValue(v => v + 1)}>
      I was rendered&nbsp;
      {value}
      &nbsp;times
    </button>
  );
};

const Throttled = () => {
  const [value, setValue] = useThrottled(0, 3000);
  console.count('example throttled');
  return (
    <button type="button" onClick={() => setValue(v => v + 1)}>
      I was rendered&nbsp;
      {value}
      &nbsp;times
    </button>
  );
};

const Event = () => {
  const [node, EventEmitter] = useEvent<HTMLDivElement>();
  console.count('example event');
  return (
    <div>
      <EventEmitter
        onResize={(event) => console.log(event)}
      />
      {' '}
      {node && node.offsetWidth}
      {' '}
      {node && node.clientWidth}
      {' '}
      {node && node.scrollWidth}
    </div>
  );
};

stories.add('useDebounced', Debounced);
stories.add('useThrottled', Throttled);
stories.add('useEvent', Event);
