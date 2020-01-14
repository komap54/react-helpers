# React Helpers

Just bunch of helpers and hooks, that I commonly use in my code

## Installation

Just run [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install @anissoft/react-helpers
```

## Components:

### - \<If [condition] />

Conditional render in jsx format

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

Then and Else can receive a callbacks as children - that allows you to safely use inside them methods, props and variables

```js
  <div>
    <If condition={!!foo} >
      <Then>{() => <p>{`Here some value for you ${foo.bar()}`}</p>}</Then>
    </If>
  </div>
}
```


### - \<Wrapper [condition] />

Conditional render like in <If />, but this time for wrapper component

```js
import * as React from 'react';
import { render } from 'react-dom';
import { Wrapper } from '@anissoft/react-helpers/components/Wrapper'

import MainApp from 'Components/Main';
import MobleViewWrapper from 'Components/Mobile';

...

render(
  <div>
    <Wrapper condition={isMobile} wrapper={MobleViewWrapper}>
      <MainApp/>
    </Wrapper>
  </div>,
  document.getElementById('app-root'),
);
```

also, can be used with function `wrap` as wrapper

```js
import * as React from 'react';
import { render } from 'react-dom';
import { Wrapper } from '@anissoft/react-helpers/components/Wrapper'

import MainApp from 'Components/Main';
import MobleViewWrapper from 'Components/Mobile';

...
const wrapIn = (children) => {
  ...
  return <MobleViewWrapper>{children}</MobleViewWrapper>
}

render(
  <div>
    <Wrapper condition={isMobile} wrap={wrapIn}>
      <MainApp/>
    </Wrapper>
  </div>,
  document.getElementById('app-root'),
);
```

### - \<Switch>

Conditional render, but for several conditions. Simple implementation of javascript switch 

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

Can render several positive cases

```js
render(
  <div>
    <Switch>
      <Case condition={ userRoles.includes('admin') }>
        <AdminView />
      </Case>
      <Case condition={ userRole.includes('regular') }>
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

Stops re-render its children if ```enabled = true```

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

### - \<Countdown [enabled]>

Shows coundown in minutes or/and seconds. Supports locales `"en"` and `"ru"`

```js
import * as React from 'react';
import { render } from 'react-dom';
import Countdown from '@anissoft/react-helpers/components/Countdown'

...

const Example = () => {
  return (
    <div>
      You have <Countdown seconds={120} format="mm ss"/> left
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

### - useDebounced(value, delay)

Debounce the [value] for [delay] (in ms)
```js
import * as React from 'react';
import useDebounced from '@anissoft/react-helpers/hooks/useDebounced';

export default ({initial}) => {
  const [value, setValue] = useState(initial);
  const [debouncedValue, setDebouncedValue] = useDebounced(initial, 300);

  const handleChange = (e) => {
     setValue(e.target.value);
     setDebouncedValue(e.target.value);
  }

  return (
    <div>
      <input
        onChange={handleChange}
      />
      <p>Value: {value}</p>
      <p>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}
```

### - useThrottled(value, delay)

Throttle the [value] for [delay] (in ms)
```js
import * as React from 'react';
import useThrottled from '@anissoft/react-helpers/hooks/useThrottled';

export default ({initial}) => {
  const [value, setValue] = useState(initial);
  const [throttledValue, setThrottledValue] = useThrottled(initial, 300);

  const handleChange = (e) => {
     setValue(e.target.value);
     setThrottledValue(e.target.value);
  }

  return (
    <div>
      <input
        onChange={handleChange}
      />
      <p>Value: {value}</p>
      <p>ThrottledValue: {throttledValue}</p>
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
  const isMounted = useMounted();

  return (
    <div>
      <If 
        condition={isMounted()}
        then={() => <p>Component just renders</p>}
        else={() => <p>Component was rendered before</p>}
      />
    </div>
  );
}
```

Since version 2.0.0 useMounted returns function - that allows you to use it in async effects to check, if component still mounted and prevent memory leak

```js
export default () => {
  const isMounted = useMounted();
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    fetch('/some/api').then((res) => {
      if (isMounted()) {
        setState(res.ok);
      }
    })
  }, [])

  return (
    <div>💣</div>
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
