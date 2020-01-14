import * as React from 'react';

import { act, cleanup, render } from '@testing-library/react';

// import { act, renderHook } from '@testing-library/react-hooks';
import useMounted from './useMounted';

describe('hook useMounted', () => {
  afterEach(cleanup);
  const Example = () => {
    const isMounted = useMounted();

    return (<span>{isMounted() ? 'Mounted' : 'NotMounted'}</span>);
  };

  test('should return change value after mount', (finish) => {
    const { container } = render(<Example />);
    setTimeout(() => {
      expect(container.textContent).toBe('Mounted');
      finish();
    }, 0);
  });
});
