import * as React from 'react';
import { MemoryRouter } from 'react-router';

import { cleanup, fireEvent, render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import useRouter, { Context } from './useRouter';

describe('hook useRouter', () => {
  afterEach(cleanup);
  const Example: React.FunctionComponent = ({ children }) => (<MemoryRouter>{children}</MemoryRouter>);
  const HookOmmit = ({ test }: { test?: (context: Context) => void }) => {
    const result = useRouter();
    test && test(result);
    return (<button onClick={() => result.history.push('/test')}>{result.location.pathname}</button>);
  };
  test('should return location, history and match', () => {
    const { container } = render(
      <Example>
        <HookOmmit test={({ match, history, location }) => {
          expect(match).toBeDefined();
          expect(history).toBeDefined();
          expect(location).toBeDefined();
        }}
        />
      </Example>
    );
  });
  test('should return location, history and match', (finish) => {
    const { container } = render(
      <Example>
        <HookOmmit />
      </Example>
    );
    const button = container.children[0];
    expect(button.textContent).toBe('/');
    fireEvent.click(button);
    setTimeout(() => {
      expect(button.textContent).toBe('/test');
      finish();
    }, 0);
  });
});
