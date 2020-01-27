import * as React from 'react';

import { act, cleanup, render } from '@testing-library/react';

import Memo from './';

const Example = ({ start }: { start: number }) => {
  const [state1, setState1] = React.useState(start);
  const [state2, setState2] = React.useState(start);

  React.useEffect(
    () => {
      const interval1 = setInterval(() => {
        setState1(old => old + 1);
      }, 5);
      const interval2 = setInterval(() => {
        setState2(old => old + 1);
      }, 1);
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    },
    [],
  );

  return (
    <div>
      <Memo deps={[state1]}>
        {state1}:{state2}
      </Memo>
    </div>
  );
};

describe('Memo component', () => {
  afterEach(cleanup);

  test('Should update children only if one of the deps changed', () => {
    const { container } = render(<Example start={0} />);
    expect(container.textContent).toBe('0:0');
  });
});
