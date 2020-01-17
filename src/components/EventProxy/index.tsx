import * as React from 'react';
import ResizeSensor, { ResizeSensorCallback } from 'css-element-queries/src/ResizeSensor';
import useMounted from '../../hooks/useMounted';

export type EventProxyProps = {
  component?: React.ComponentType<any> | string;
  direction?: 'parent' | 'child' | 'sibling-next' | 'sibling-previous';
  onResize?: boolean | ResizeSensorCallback;
  onMutation?: boolean | MutationCallback;
  onScroll?: boolean | ((event: Event) => void);
  onClick?: boolean | ((event: Event) => void);
  onClickCapture?: boolean | ((event: Event) => void);
  onFocus?: boolean | ((event: Event) => void);
  onBlur?: boolean | ((event: Event) => void);
  onMouseOver?: boolean | ((event: Event) => void);
  onMouseOut?: boolean | ((event: Event) => void);
};

export function getElement<T extends HTMLElement>(ref: HTMLElement | null, direction: EventProxyProps['direction']) {
  if (!ref) {
    return null;
  }
  switch (direction) {
    case ('sibling-previous'):
      return ref.previousElementSibling as T;
    case ('sibling-next'):
      return ref.nextElementSibling as T;
    case ('child'):
      return ref.firstElementChild as T;
    case ('parent'):
    default:
      return ref.parentElement as T;
  }
};

export const EventProxy = React.memo(function Spy<T extends HTMLElement = HTMLElement>({
  component: Component = 'div',
  direction = 'child',
  children,
  onResize,
  onMutation,
  onScroll,
  onClick,
  onClickCapture,
  onFocus,
  onBlur,
  onMouseOver,
  onMouseOut,
  ...other
}: React.PropsWithChildren<EventProxyProps>) {
  const [, setState] = React.useState(Symbol('__'));
  const ref = React.useRef<HTMLElement>(null);
  const update = () => setState(Symbol('__'));
  useMounted();

  React.useEffect(() => {
    if (!ref.current || typeof window === 'undefined') {
      return () => undefined;
    }
    const cleanUp: (() => void)[] = [];
    const element = getElement<T>(ref.current, direction) as T;
    if (onResize) {
      const sensor = new ResizeSensor(
        element as T,
        typeof onResize === 'function' ? onResize : update,
      );
      cleanUp.push(() => {
        sensor.detach();
      });
    }

    /* istanbul ignore next */
    if (onMutation && typeof MutationObserver !== 'undefined') {
      /* istanbul ignore next */
      const observer = new MutationObserver(
        typeof onMutation === 'function'
          ? onMutation
          : update,
      );
      /* istanbul ignore next */
      observer.observe(element as T, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });
      /* istanbul ignore next */
      cleanUp.push(() => {
        observer.disconnect();
      });
    }

    [
      { event: 'scroll', callback: onScroll },
      { event: 'click', callback: onClick },
      { event: 'click', callback: onClickCapture, options: true },
      { event: 'blur', callback: onBlur },
      { event: 'focus', callback: onFocus },
      { event: 'mouseover', callback: onMouseOver },
      { event: 'mouseout', callback: onMouseOut },
    ].forEach(({ event, callback, options }) => {
      if (callback) {
        const eventListener = typeof callback === 'function'
          ? callback as EventListener
          : update;
        (element as T).addEventListener(event, eventListener, options);

        cleanUp.push(() => {
          (element as T).removeEventListener(event, eventListener, options);
        });
      }
    });

    return () => {
      cleanUp.forEach(callback => callback());
    };
  }, [
    ref.current,
    direction,
    Component,
    onMutation,
    onResize,
    onScroll,
    onClick,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseOut
  ]);

  return <Component {...other} ref={ref}>{children}</Component>;
});

export default EventProxy;
