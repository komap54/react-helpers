import * as React from 'react';
import "regenerator-runtime/runtime";

import { act, cleanup, render } from '@testing-library/react';

import Countdown from '.';

const originalError = console.error;

describe('Countdown component', () => {
  beforeAll(() => {
    console.error = (...args: any[]) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterEach(cleanup);

  afterAll(() => {
    console.error = originalError
  })

  test('Should render countdown', async (end) => {
    const { container, } = render(<Countdown seconds={4} format="m:s" locale="en" />);
    expect(container.textContent).toBe('00:04');
    await new Promise((res) => setTimeout(() => res(), 1000));
    expect(['00:03', '00:02']).toContain(container.textContent);
    await new Promise((res) => setTimeout(() => res(), 3000));
    expect(container.textContent).toBe('00:00');
    end();
  });

  test('Should use [EN] locale and "m:s" format', async (end) => {
    const { container, } = render(<Countdown seconds={4} />);
    expect(container.textContent).toBe('00:04');
    end();
  });

  test('Should respect locale [EN]', async (end) => {
    const { container, rerender } = render(<Countdown seconds={121} format="mm ss" locale="en" />);
    expect(container.textContent).toBe('2 minutes 1 second');
    rerender(<Countdown seconds={121} format="m:s" locale="en" />);
    expect(container.textContent).toBe('02:01');
    rerender(<Countdown seconds={121} format="m" locale="en" />);
    expect(container.textContent).toBe('3');
    rerender(<Countdown seconds={121} format="mm" locale="en" />);
    expect(container.textContent).toBe('3 minutes');
    rerender(<Countdown seconds={121} format="s" locale="en" />);
    expect(container.textContent).toBe('121');
    rerender(<Countdown seconds={121} format="ss" locale="en" />);
    expect(container.textContent).toBe('121 seconds');

    const { container: container2 } = render(<Countdown seconds={600} format="mm" locale="en" />);
    expect(container2.textContent).toBe('10 minutes');

    const { container: container3 } = render(<Countdown seconds={30} format="mm ss" locale="en" />);
    expect(container3.textContent).toBe('30 seconds');
    end();
  });

  test('Should respect locale [RU]', async (end) => {
    const { container, rerender } = render(<Countdown seconds={121} format="mm ss" locale="ru" />);
    expect(container.textContent).toBe('2 минуты 1 секунда');
    rerender(<Countdown seconds={121} format="m:s" locale="ru" />);
    expect(container.textContent).toBe('02:01');
    rerender(<Countdown seconds={121} format="m" locale="ru" />);
    expect(container.textContent).toBe('3');
    rerender(<Countdown seconds={121} format="mm" locale="ru" />);
    expect(container.textContent).toBe('3 минуты');
    rerender(<Countdown seconds={121} format="s" locale="ru" />);
    expect(container.textContent).toBe('121');
    rerender(<Countdown seconds={121} format="ss" locale="ru" />);
    expect(container.textContent).toBe('121 секунда');

    const { container: container2 } = render(<Countdown seconds={128} format="mm ss" locale="ru" />);
    expect(container2.textContent).toBe('2 минуты 8 секунд');

    const { container: container3 } = render(<Countdown seconds={30} format="mm ss" locale="ru" />);
    expect(container3.textContent).toBe('30 секунд');
    end();
  });

  test('Should respect locale [RU-PASSIVE]', async (end) => {
    const { container, rerender } = render(<Countdown seconds={121} format="mm ss" locale="ru-passive" />);
    expect(container.textContent).toBe('2 минуты 1 секунду');
    rerender(<Countdown seconds={121} format="m:s" locale="ru-passive" />);
    expect(container.textContent).toBe('02:01');
    rerender(<Countdown seconds={121} format="m" locale="ru-passive" />);
    expect(container.textContent).toBe('3');
    rerender(<Countdown seconds={121} format="mm" locale="ru-passive" />);
    expect(container.textContent).toBe('3 минуты');
    rerender(<Countdown seconds={121} format="s" locale="ru-passive" />);
    expect(container.textContent).toBe('121');
    rerender(<Countdown seconds={121} format="ss" locale="ru-passive" />);
    expect(container.textContent).toBe('121 секунду');

    const { container: container2 } = render(<Countdown seconds={128} format="ss" locale="ru-passive" />);
    expect(container2.textContent).toBe('128 секунд');

    const { container: container3 } = render(<Countdown seconds={30} format="mm ss" locale="ru-passive" />);
    expect(container3.textContent).toBe('30 секунд');
    end();
  });


  test('Should add leading zeros for "m" and "s"', async (end) => {
    const { container } = render(<Countdown seconds={4} format="m:s" />);
    expect(container.textContent).toBe('00:04');
    const { container: container2 } = render(<Countdown seconds={630} format="m:s" />);
    expect(container2.textContent).toBe('10:30');
    end();
  });

  test('Should execute callback at the end', async (end) => {
    const onExpire = jest.fn(() => undefined);
    const { container } = render(<Countdown seconds={4} format="m:s" onExpire={onExpire} />);
    expect(container.textContent).toBe('00:04');
    await new Promise((res) => setTimeout(() => res(), 4000));
    expect(onExpire).toBeCalled();
    end();
  });

  test('Should call onChange', (end) => {
    const onChange = jest.fn(() => undefined);
    const { container } = render(<Countdown seconds={10} format="m:s" onChange={onChange} />);
    expect(container.textContent).toBe('00:10');
    setTimeout(() => {
      expect(onChange).toBeCalledTimes(1);
      end();
    }, 1000);
  });

  test('Should pause if pause set in true', (end) => {
    const onChange = jest.fn(() => undefined);
    const { container } = render(<Countdown seconds={10} pause format="m:s" onChange={onChange} />);
    expect(container.textContent).toBe('00:10');
    setTimeout(() => {
      expect(onChange).toBeCalledTimes(0);
      expect(container.textContent).toBe('00:10');
      end();
    }, 1500);
  });
});
