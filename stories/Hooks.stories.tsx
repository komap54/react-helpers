import React from 'react';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from '@storybook/addons';
import wait from '../src/helpers/Wait';
import useDebounced from '../src/hooks/useDebounced';
import useEvent from '../src/hooks/useDOMSpy';
import useThrottled from '../src/hooks/useThrottled';
import useAsyncEffect from '../src/hooks/useAsyncEffect';
import useCountdown from '../src/hooks/useCountdown';
// import { useQueryFlag } from '../src/hooks/useUrl';

const stories = storiesOf('Hooks', module);
stories.addDecorator(withKnobs({ escapeHTML: false }));

stories.add('useDebounced', () => {
  const [value, setValue] = useDebounced(0, 3000);
  console.count('example debounced');
  return (
    <button type="button" onClick={() => setValue(v => v + 1)}>
      I was rendered&nbsp;
      {value}
      &nbsp;times
    </button>
  );
});

stories.add('useThrottled', () => {
  const [value, setValue] = useThrottled(0, 3000);
  console.count('example throttled');
  return (
    <button type="button" onClick={() => setValue(v => v + 1)}>
      I was rendered&nbsp;
      {value}
      &nbsp;times
    </button>
  );
});

stories.add('useEvent', () => {
  const [node, EventEmitter] = useEvent<HTMLDivElement>('child');
  const direction = select('direction', ['sibling-next', 'sibling-previous', 'child', 'parent'], 'parent' );
  return (
    <div style={{ width: '100%', height: '200px', overflowY: 'scroll' }}>
      <div>previous sibling</div>
      <EventEmitter
        direction={direction}
        component='i'
        onClickCapture={action('click-capture')}
        onMouseOver={action('mouse-in')}
        onMouseOut={action('mouse-out')}
        onResize={action('resize')}
        onMutation={action('mutation')}
        onScroll={action('scroll')}
        onBlur={action('blur')}
        onFocus={action('focus')}
      >
        <div>child</div>
      </EventEmitter>
      <div>next sibling_</div>
      <div style={{ width: '100%', height: '800px' }} />
    </div>
  );
});

stories.add('useAsyncState', () => {
  const [state1, setState1] = useState<number>(0);
  const [state2, setState2] = useState<number>(0);

  useAsyncEffect(async () => {
    await wait(1000);
    setState1(v => v + 1);
    await wait(1000);
    return () => {
      console.log('run cleanup1');
    };
  }, [state1]);

  useAsyncEffect(async () => {
    await wait(1000);
    setState2(v => v + 1);
    await wait(1000);
    return () => {
      console.log('run cleanup2');
    };
  }, []);

  return (
    <pre>
      {JSON.stringify({ state1, state2 }, null, 4)}
    </pre>
  );
});

stories.add('useCountdown', () => {
  const [CountdownComponent, reset] = useCountdown()

  return (
    <div>
      <div>
        <CountdownComponent 
           seconds={number('seconds', 120)}
           format={select('format', ['s', 'ss', 'mm ss', 'm:s', 'm', 'mm'], 'm:s')}
           locale={select('locale', ['en', 'ru', 'ru-passive'], 'en')}
        />
      </div>
      <div>
      <button onClick={reset}>reset</button>
      </div>
    </div>
  );
});
