import * as React from 'react';

import { act, cleanup, render } from '@testing-library/react';

import Freeze from '.';

const Example = ({ start }: { start: number }) => {
  const [state, setState] = React.useState(start);

  React.useEffect(
    () => {
      const interval = setInterval(() => act(() => { setState(old => old + 1); }), 5);
      return () => clearInterval(interval);
    },
    [],
  );

  return (
    <div>
      <Freeze enabled={state >= 10}>
        {state}
      </Freeze>
    </div>
  );
};

describe('Freeze component', () => {
  afterEach(cleanup);

  test('Should render children normally if enabled falsy', () => {
    const { container } = render(<Example start={0} />);
    expect(container.textContent).toBe('0');
  });

  test('Should stops update children when enabled === true', (finish) => {
    const { container } = render(<Example start={0} />);
    setTimeout(() => {
      expect(container.textContent).toBe('10');
      finish();
    }, 300);
  });
});
