import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';

import wait from '../../helpers/Wait'
import Memo from './';
import { MemoV2 } from './';

const Example = ({
    MemoComponent = Memo,
    start
  }: { 
    MemoComponent?: React.FunctionComponent<{deps?: React.DependencyList}>;
    start: number;  
  }) => {
  const [state1, setState1] = React.useState(start);
  const [state2, setState2] = React.useState(start);

  React.useEffect(
    () => {
      const interval1 = setInterval(() => {
        setState1(old => old + 1);
      }, 1000);
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
      <MemoComponent deps={[state1]}>
        {state1}:{state2}
      </MemoComponent>
    </div>
  );
};

describe('Memo component', () => {
  afterEach(cleanup);

  test('Should update children only if one of the deps changed', async (finish) => {
    const { container } = render(<Example start={0} />);
    expect(container.textContent).toBe('0:0');
    await wait(500);
    expect(container.textContent).toBe('0:0');
    finish();
  });
});

describe('MemoV2 component', () => {
  afterEach(cleanup);

  test('Should update children only if one of the deps changed', async (finish) => {
    const { container } = render(<Example MemoComponent={MemoV2} start={0} />);
    expect(container.textContent).toBe('0:0');
    await wait(500);
    expect(container.textContent).toBe('0:0');
    finish();
  });
});
