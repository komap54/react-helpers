import * as React from 'react';

import { act, cleanup, render } from '@testing-library/react';

// import { act, renderHook } from '@testing-library/react-hooks';
import useMounted from './useMounted';

describe('hook useMounted', () => {
  afterEach(cleanup);
  const Example = ({ onMounting }: { onMounting: (mounted: boolean, isMounting: boolean) => void }) => {
    const [mounted, isMounted] = useMounted();

    React.useEffect(() => {
      onMounting(mounted, isMounted());
    }, []);

    return (<span>{mounted ? 'Mounted' : 'NotMounted'}</span>);
  };

  test('should return change value after mount', (finish) => {
    const onMounting = jest.fn();
    const { container } = render(<Example onMounting={onMounting} />);
    setTimeout(() => {
      expect(onMounting).toBeCalledWith(false, true);
      expect(container.textContent).toBe('Mounted');
      finish();
    }, 10);
  });
});
