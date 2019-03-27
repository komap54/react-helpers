# React Helpers

Just bunch of helpers and hooks, that I commonly use in my code

## Installation
Just run [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```bash
$ npm install @anissoft/react-helpers
```
## Components:
### - \<If [condition then else] />
Conditional renders in jsx format

```js
import * as React from 'react';
import { render } from 'react-dom';
import If from '@anissoft/react-helpers/components/If'

import MainApp from 'Components/Main';
import SecondaryApp from 'Components/Secondary';

...

render(
  <div>
    <If
      condition={!isErrored}
      then={() => <MainApp/>}
      else={() => <SecondaryApp/>}
    />
  </div>,
  document.getElementById('app-root'),
);
```

also, there is a shortener for case without else:

```js
  <div>
    <If condition={isErrored}>
      <MainApp/>
    </If>
  </div>
```

## Hooks

### - useDebounce(value, delay)

Debounce the [value] for [delay] (in ms)
```js
import * as React from 'react';
import useDebounce from '@anissoft/react-helpers/hooks/useDebounce';

export default () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(text, 300);

  return (
    <div>
      <input
        onChange={e => setValue(e.target.value)}
      />
      <p>Value: {value}</p>
      <p>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}
```

### - useMounted

Shortway for 'didMount' property
```js
import * as React from 'react';
import If from '@anissoft/react-helpers/components/If';
import useMounted from '@anissoft/react-helpers/hooks/useMounted';

export default () => {
  const didMount = useMounted();

  return (
    <div>
      <If 
        condition={didMount}
        then={() => <p>Component just render</p>}
        else={() => <p>Component was rendered before</p>}
      />
    </div>
  );
}
```
