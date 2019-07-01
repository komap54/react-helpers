# React Helpers

Just bunch of helpers and hooks, that I commonly use in my code

## Installation
Just run [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```bash
$ npm install @anissoft/react-helpers
```
## Components:
### - \<If [condition] />
Conditional renders in jsx format

```js
import * as React from 'react';
import { render } from 'react-dom';
import { If, Then, Else } from '@anissoft/react-helpers/components/If'

import MainApp from 'Components/Main';
import Error from 'Components/Error';

...

render(
  <div>
    <If condition={!isErrored}>
      <Then><MainApp/></Then>
      <Else><Error/></Else>
    </If>
  </div>,
  document.getElementById('app-root'),
);
```

also, there is a shortener for case without else:

```js
  <div>
    <If condition={!isErrored}>
      <MainApp/>
    </If>
  </div>
```

then and else props receive a callbacks - that allows you to safely use inside them methods or props, which can be reassigned

```js
  <div>
    <If condition={!!foo} >
      <Then>{() => <p>{`Here some value for you ${foo.bar()}`}</p>}</Then>
    </If>
  </div>
}
```

### - \<Switch>

Conditional rendering, but for several conditions. Simple implementation of javascript switch 

```js
import * as React from 'react';
import { render } from 'react-dom';
import { Switch, Case, Default } from '@anissoft/react-helpers/components/Switch'

import AdminView from 'Components/Admin';
import UserView from 'Components/User';
import DefaultView from 'Components/Default';

...

render(
  <div>
    <Switch>
      <Case condition={ userRole === 'admin' }>
        <AdminView />
      </Case>
      <Case condition={ userRole === 'regular' }>
        <UserView />
      </Case>
      <Default>
        <DefaultView />
      </Default>
    </Switch>
  </div>,
  document.getElementById('app-root'),
);
```

### - \<Try [onCatch, silent]>
An react [error boundarie component](https://reactjs.org/docs/error-boundaries.html), for catching errors from its own children

```js
import * as React from 'react';
import { render } from 'react-dom';
import Try from '@anissoft/react-helpers/components/Try'

...

const ErrorComponent = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow) {
      throw new Error('💣');
    } else {
      return null;
    }
  }

const Example = () => {
  return (
    <div>
      <Try onCatch={(error: Error) => <p>Smth went wrong</p>}>
        <ErrorComponent shouldThrow/>
      </Try>
    </div>
  )
};
```

### - \<Freeze [enabled]>
Stops rerender its children if ```enabled = true```

```js
import * as React from 'react';
import { render } from 'react-dom';
import Freeze from '@anissoft/react-helpers/components/Freeze'

...

const Example = () => {
  const [state, setState] = React.useState(0);

  React.useEffect(
    () => {
      setInterval(() => setState(old => old + 1), 1000);
    },
    [],
  );

  return (
    <div>
      <Freeze enabled={state >= 10}>
        <span>Will update this number, until it became 10 - [{state}]</span>
      </Freeze>
    </div>
  )
};
```

## Hooks

### - useRouter()

React hook, which allows you to use [`match`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md), [`location`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) and [`history`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md) from React-Router. Should be used in components under \<Router />, \<BrowserRouter> etc.
```js
import * as React from 'react';
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
        then={() => <p>Component just renders</p>}
        else={() => <p>Component was rendered before</p>}
      />
    </div>
  );
}
```

### - useRefFor([React.Component])

Returns enhanced component and ref for it;
```js
import * as React from 'react';
import useRefFor from '@anissoft/react-helpers/hooks/useRefFor';

import CustomInput from 'Components/MyInput';

export default () => {
  const [ref, Input] = useRefFor(CustomInput);

  React.useEffect(
    () => {
      console.log('You changed value in input!')
    },
    [ref.current.value],
  );

  return (
    <div>
     <Input />
    </div>
  );
}
```

### - useThrottle() - TBD: chnage to useThrottledState

Returns throttled value;

