import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { render, cleanup, fireEvent } from '@testing-library/react';

import useCountdown from './useCountdown';
import { CountdownProps } from '../components/Countdown';

const Example = (props: CountdownProps) => {
  const [CountdownComponent, reset] = useCountdown();

  return (
    <div onClick={reset}>
      <CountdownComponent 
        {...props}
      />
    </div>
  )
}

describe('hook useCountdown', () => {
  afterEach(cleanup);

  test('should return component and reset functions', () => {
    const { result } = renderHook(() => useCountdown());
    expect(typeof result.current[0]).toBe('function');
    expect(typeof result.current[1]).toBe('function');
  });

  test('should render countdown component', (finish) => {
    const { container } = render(<Example seconds={120} format="m:s"/>);
    expect(container.textContent).toBe('02:00');
    setTimeout(() => {
      expect(container.textContent).toBe('01:59');
      finish();
    }, 1000);
  });

  test('should reset countdown if reset wewas called', (finish) => {
    const { container } = render(<Example seconds={120} format="m:s"/>);
    expect(container.textContent).toBe('02:00');
    setTimeout(() => {
      expect(container.textContent).toBe('01:59');
      fireEvent.click(container.children[0]);
      setTimeout(() => {
        expect(container.textContent).toBe('02:00');
        finish();
      }, 0);
    }, 1000);
  });

  // test('should not update value meanwile delays', (finish) => {
  //   const { result } = renderHook(() => useDebounced(0, 100));
  //   expect(result.current[0]).toBe(0);
  //   const interval = setInterval(() => {
  //     result.current[1](v => v + 1);
  //   }, 10);
  //   setTimeout(
  //     () => {
  //       expect(result.current[0]).toBe(0);
  //       clearInterval(interval);
  //       finish();
  //     },
  //     200,
  //   );
  // });
});
