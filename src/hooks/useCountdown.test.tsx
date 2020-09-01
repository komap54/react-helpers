import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { render, cleanup, fireEvent } from '@testing-library/react';

import useCountdown from './useCountdown';
import { CountdownProps } from '../components/Countdown';

const Example = (props: CountdownProps) => {
  const [CountdownComponent, { reset, pause, resume }] = useCountdown();

  return (
    <>
      <div>
        <CountdownComponent 
          {...props}
        />
      </div>
      <button id="reset" onClick={reset}></button>
      <button id="pause" onClick={pause}></button>
      <button id="resume" onClick={resume}></button>
    </>
  )
}

describe('hook useCountdown', () => {
  afterEach(cleanup);

  test('should return component and reset functions', () => {
    const { result } = renderHook(() => useCountdown());
    expect(typeof result.current[0]).toBe('function');
    expect(result.current[1]).toHaveProperty('reset')
    expect(result.current[1]).toHaveProperty('resume')
    expect(result.current[1]).toHaveProperty('pause')
  });

  test('should render countdown component', (finish) => {
    const { container } = render(<Example seconds={120} format="m:s"/>);
    expect(container.textContent).toBe('02:00');
    setTimeout(() => {
      expect(container.textContent).toBe('01:59');
      finish();
    }, 1000);
  });

  test('should reset countdown if reset was called', (finish) => {
    const { container } = render(<Example seconds={120} format="m:s"/>);
    expect(container.textContent).toBe('02:00');
    setTimeout(() => {
      expect(container.textContent).toBe('01:59');
      fireEvent.click(container.children[1]);
      setTimeout(() => {
        expect(container.textContent).toBe('02:00');
        finish();
      }, 0);
    }, 1000);
  });

  test('should pause countdown if pause was called', (finish) => {
    const { container, } = render(<Example seconds={120} format="m:s"/>);
    expect(container.textContent).toBe('02:00');
    setTimeout(() => {
      expect(container.textContent).toBe('01:59');
      fireEvent.click(container.children[2]);
      setTimeout(() => {
        expect(container.textContent).toBe('01:59');
        finish();
      }, 2500);
    }, 100);
  });

  test('should resume countdown if resume was called', (finish) => {
    const { container, } = render(<Example seconds={120} format="m:s"/>);
    expect(container.textContent).toBe('02:00');
    setTimeout(() => {
      expect(container.textContent).toBe('01:59');
      fireEvent.click(container.children[2]);
      setTimeout(() => {
        expect(container.textContent).toBe('01:59');
        fireEvent.click(container.children[3]);
        setTimeout(() => {
          expect(container.textContent).toBe('01:58');
          finish();
        }, 1000);
      }, 1500);
    }, 100);
  });

});
