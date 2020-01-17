import React from 'react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { If, Then, Else } from '../src/components/If';
import { Iframe } from '../src/components/Iframe';

const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs({ escapeHTML: false }));

const Children = () => {
  const counter = React.useRef(0);
  counter.current += 1;
  return (
    <span>
      I was rendered&nbsp;
      {counter.current}
      &nbsp;times
    </span>
  );
};

stories.add('If', () => (
  <div>
    <If condition={boolean('condition', true)}>
      <Children />
    </If>
  </div>
));

stories.add('Iframe', () => {
  const [size, saveSize] = React.useState({ width: 0, height: 0 });
  return (
    <div>
      <Iframe
        width={Math.max(size.width, 300)}
        height={size.height}
        src={text(
          'src',
          'http://localhost.testkontur.ru:3000/pages/upregistration/test?allfields&embedded',
        )}
        onMessage={(event) => {
          const { status, message: { width, height } } = JSON.parse(event.data);
          if (status === 'service') {
            saveSize({ width, height });
          }
        }}
      />
    </div>
  );
});
