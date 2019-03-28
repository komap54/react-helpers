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

then and else props receive a callbacks - that allows you to safely use inside them methods or props, which can be reassigned

```js
  <div>
    <If 
      condition={!foo}
      else={() => <p>{`Here some value for you ${foo.bar()}`}</p>}
    />
  </div>
}
```

## Hooks

### - useRouter()

React hook, which allows you to use [`match`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md), [`location`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) and [`history`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md) from React-Router
```js
import * as React from 'react';
import If from '@anissoft/react-helpers/components/If';
import useRouter from '@anissoft/react-helpers/hooks/useRouter';

export default () => {
  const {match, location, history} = useRouter();

  return (
    <div>
     <p>Current route path: <b>{match.path}</b></p>
     <p>Whole pathname of page: <b>{location.pathname}</b></p>
     <input 
        type="button"
        onCLick={() => history.push(`${match.path}/directory`)}
      >
        Add directory
      </>
    </div>
  );
}
```

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

### - useMounted()

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
