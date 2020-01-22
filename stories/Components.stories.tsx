/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { text, boolean, withKnobs, number, select, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Countdown from '../src/components/Countdown';
import Wrapper from '../src/components/Wrapper';
import Freeze from '../src/components/Freeze';
import Memo from '../src/components/Memo';
import Try from '../src/components/Try';
import { If, Then, Else } from '../src/components/If';
import { EventProxy } from '../src/components/EventProxy';

const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs({ escapeHTML: false }));

const Children = () => {
  const counter = React.useRef(0);
  counter.current += 1;
  return (
    <div role="button" onClick={(event) => event.stopPropagation()}>
      I was rendered&nbsp;
      {counter.current}
      &nbsp;times
    </div>
  );
};

stories.add('If', () => (
  <div>
    <If condition={boolean('condition', true)}>
      <Then>
        <Children />
      </Then>
      <Else>
        nothing
      </Else>
    </If>
  </div>
));

stories.add('Memo', () => {
  const value1 = text('value1', 'default-value');
  const value2 = text('value2', 'default-value');

  return (
    <div>
      <Memo deps={[value1]}>
        {value1}
        {' '}
        changes
        <br />
        {value2}
        {' '}
        do not
      </Memo>
    </div>
  );
});

stories.add('Memo2', () => {
  const [state1, setState1] = React.useState(0);
  const [state2, setState2] = React.useState(0);

  React.useEffect(
    () => {
      const interval = setInterval(() => {
        setState2(old => old + 1);
      }, 100);
      return () => {
        clearInterval(interval);
      };
    },
    [],
  );

  return (
    <div>
      <Memo deps={[state1]}>
        <span>
          {state2}
          &nbsp;
        </span>
        <span>This value doesn&apos;t change, until you press &nbsp;</span>
        <button role="button" onClick={() => setState1(v => v + 1)}>Increment</button>
      </Memo>
    </div>
  );
});

stories.add('Freeze', () => {
  const [state, setState] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setState(v => v + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Freeze enabled={boolean('enabled', false)}>
        I was rendered:
        {' '}
        {state}
        {' '}
        times
      </Freeze>
    </div>
  );
});

stories.add('EventProxy', () => (
  <div>
    <EventProxy
      direction={text('direction', 'child')}
      onClick
      onClickCapture={action('click-capture')}
      onMouseOver={action('mouse-in')}
      onMouseOut={action('mouse-out')}
      onResize={action('resize')}
      onMutation={action('mutation')}
      onScroll={action('scroll')}
      onBlur={action('blur')}
      onFocus={action('focus')}
    >
      <Children />
    </EventProxy>
  </div>
));

const ErrorComponent = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return <>Everything fine</>;
  }
};

stories.add('Try', () => (
  <div>
    <Try
      onCatch={(error) => {
        action('catch')(error);
        return 'Exception caught';
      }}
    >
      <ErrorComponent shouldThrow={boolean('should throw', false)} />
    </Try>
  </div>
));

const WrapperComponent: React.FC = ({ children }) => (
  <div>
    {'< Обнимашка>'}
    {children}
    {'</Обнимашка>'}
  </div>
);

stories.add('Wrapper', () => (
  <div>
    <Wrapper condition={boolean('wrap', false)} wrapper={WrapperComponent}>
      <Children />
    </Wrapper>
  </div>
));

stories.add('CountDown', () => (
  <div>
    <Countdown
      seconds={number('seconds', 120)}
      format={select('format', ['s', 'ss', 'mm ss', 'm:s', 'm', 'mm'], 'm:s')}
      locale={select('locale', ['en', 'ru', 'ru-passive'], 'en')}
    />
  </div>
));
