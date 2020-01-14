import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import useEvent from './useDOMSpy';
import { ResizeSensorCallback } from 'css-element-queries/src/ResizeSensor';

describe('hook useEvent', () => {
  afterEach(cleanup);

  const Example = ({
    onResize,
    width
  }: {
    width: number,
    onResize: boolean | ResizeSensorCallback,
  }) => {
    const [node, EventEmitter] = useEvent<HTMLDivElement>();
    const ref = React.useRef(0);
    ref.current = ref.current + 1;
    return (
      <div style={{ width }}>
        <EventEmitter
          onResize={(onResize)}
        />
        was rendered {ref.current}
      </div>
    );
  };

  // onResize doesnt work not in teh browser

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
