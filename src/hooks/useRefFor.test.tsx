import * as React from 'react';

import { cleanup, render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import useRefFor from './useRefFor';

describe('hook useRefFor', () => {
  afterEach(cleanup);
  const Input = React.forwardRef((props: React.ComponentProps<'input'>, ref: React.Ref<HTMLInputElement>) => (<input {...props} ref={ref} />));
  // const Example = () => {
  //   const [ref, Component] = useRefFor(Input);

  //   return (<span>{mounted ? 'Mounted' : 'NotMounted'}</span>)
  // }

  test('should return ref object for component', () => {
    const { result } = renderHook(() => useRefFor(Input));
    expect(result.current[0].current).toBe(null);
    const Component = result.current[1];
    const { container, rerender } = render(<Component />);
    rerender(<Component defaultValue="500" />)
    expect(result.current[0].current && result.current[0].current.defaultValue).toBe('500');
  });
});
