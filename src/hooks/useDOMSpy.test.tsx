import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import useEvent from './useDOMSpy';
import { EventProxyProps } from '../components/EventProxy';

describe('hook useEvent', () => {
  afterEach(cleanup);

  const Example = ({
    width,
    direction,
    ...props
  }: {
    direction?: string;
    width: number,
  } & Partial<EventProxyProps>) => {
    const [node, EventEmitter] = useEvent<HTMLDivElement>(direction as any);
    const ref = React.useRef(0);
    ref.current = ref.current + 1;
    return (
      <div style={{ width }}>
        <i>previous sibling_</i>
        <EventEmitter {...props} >
          <i>child_</i>
        </EventEmitter>
        <i>next sibling_</i>
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    finish();
  });

  test('just works, with child as target', (finish) => {
    const { container, rerender } = render(
      <Example
        direction="child"
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    finish();
  });

  test('just works, with sibling-previous as target', (finish) => {
    const { container, rerender } = render(
      <Example
        direction="sibling-previous"
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    finish();
  });

  test('just works, with sibling-next as target', (finish) => {
    const { container, rerender } = render(
      <Example
        direction="sibling-next"
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    finish();
  });

  test('just works, with parent as target', (finish) => {
    const { container, rerender } = render(
      <Example
        direction="parent"
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    finish();
  });

  test('just works, with selector as target', (finish) => {
    const { container, rerender } = render(
      <Example
        direction="i"
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
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
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    finish();
  });

  test('should rerender if size changed', (finish) => {
    const { container, rerender } = render(<Example onResize width={300} />);
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    rerender(<Example onResize width={400} />)
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 2');
    finish();
  });

  test('should call onResize callback', async (finish) => {
    const onResize = (size: any) => {
      expect(size).toBe('NaN');
    };

    const { container, rerender } = render(<Example onResize={onResize} width={30} />);
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 1');
    rerender(<Example onResize={onResize} width={400} />)
    expect(container.textContent).toBe('previous sibling_child_next sibling_was rendered 2');
    finish();
  });
});
