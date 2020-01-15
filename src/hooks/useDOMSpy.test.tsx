import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import useEvent, { SpyProps } from './useDOMSpy';
import { ResizeSensorCallback } from 'css-element-queries/src/ResizeSensor';

describe('hook useEvent', () => {
  afterEach(cleanup);

  const Example = ({
    width,
    ...props
  }: {
    width: number,
  } & SpyProps<HTMLDivElement>) => {
    const [node, EventEmitter] = useEvent<HTMLDivElement>();
    const ref = React.useRef(0);
    ref.current = ref.current + 1;
    return (
      <div style={{ width }}>
        <EventEmitter {...props} />
        was rendered {ref.current}
      </div>
    );
  };

  // this stuff doesnt work properly outside the browser =(

  test('just works, i guess', (finish) => {
    const { container, rerender } = render(
      <Example
        width={300}
        onResize
        onMutation
        onScroll
        onBlur
        onFocus
        onClick
        onMouseOver
        onMouseOut
      />
    );
    expect(container.textContent).toBe('was rendered 2');
    finish();
  });

  test('just works with callbacks', (finish) => {
    const { container, rerender } = render(
      <Example
        width={300}
        onResize={(event) => console.log('resize', event)}
        onMutation={(event) => console.log('mutation', event)}
        onScroll={(event) => console.log('scroll', event)}
        onBlur={(event) => console.log('blur', event)}
        onFocus={(event) => console.log('focus', event)}
        onClick={(event) => console.log('click', event)}
        onMouseOver={(event) => console.log('hover', event)}
        onMouseOut={(event) => console.log('mouseout', event)}
      />
    );
    expect(container.textContent).toBe('was rendered 2');
    finish();
  });

  test('should rerender if size changed', (finish) => {
    const { container, rerender } = render(<Example onResize width={300} />);
    expect(container.textContent).toBe('was rendered 2');
    rerender(<Example onResize width={400} />)
    expect(container.textContent).toBe('was rendered 3');
    finish();
  });

  test('should call onResize callback', async (finish) => {
    const onResize = (size: any) => {
      expect(size).toBe('NaN');
    };

    const { container, rerender } = render(<Example onResize={onResize} width={30} />);
    expect(container.textContent).toBe('was rendered 2');
    rerender(<Example onResize={onResize} width={400} />)
    expect(container.textContent).toBe('was rendered 3');
    finish();
  });
});
