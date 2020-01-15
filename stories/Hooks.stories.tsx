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
  const [node, EventEmitter] = useEvent<HTMLDivElement>('sibling-next');
  console.log(node);
  return (
    <div style={{ width: '100%', height: '200px', overflowY: 'scroll' }}>
      <div>previous sibling</div>
      <EventEmitter
        onResize={(event) => console.log('resize', event)}
        onMutation={(event) => console.log('mutation', event)}
        onScroll={(event) => console.log('scroll', event)}
        onBlur={(event) => console.log('blur', event)}
        onFocus={(event) => console.log('focus', event)}
        onClick={(event) => console.log('click', event)}
        onMouseOver={(event) => console.log('hover', event)}
        onMouseOut={(event) => console.log('mouseout', event)}
      >
        <div>child</div>
      </EventEmitter>
      <div>next sibling_</div>
      <div style={{ width: '100%', height: '800px' }} />
    </div>
  );
};

stories.add('useDebounced', Debounced);
stories.add('useThrottled', Throttled);
stories.add('useEvent', Event);
