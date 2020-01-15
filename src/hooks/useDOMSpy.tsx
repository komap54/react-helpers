import React, { useRef, ComponentProps, PropsWithChildren } from 'react';
import ResizeSensor, { ResizeSensorCallback } from 'css-element-queries/src/ResizeSensor';
import useMounted from './useMounted';

export type SpyProps<T extends HTMLElement> = {
  onResize?: boolean | ResizeSensorCallback;
  onMutation?: boolean | MutationCallback;
  onScroll?: boolean | ((event: Event) => void);
  onClick?: boolean | ((event: Event) => void);
  onFocus?: boolean | ((event: Event) => void);
  onBlur?: boolean | ((event: Event) => void);
  onMouseOver?: boolean | ((event: Event) => void);
  onMouseOut?: boolean | ((event: Event) => void);
};

export default function <T extends HTMLElement>(
  direction: 'parent' | 'child' | 'sibling-next' | 'sibling-previous' = 'parent'
) {
  const ref = useRef<HTMLElement>(null);
  const [, update] = React.useState(Symbol('__'));
  useMounted();

  const getElement = () => {
    if (!ref.current) {
      return null;
    }
    switch (direction) {
      case ('sibling-previous'):
        return ref.current.previousElementSibling as T;
      case ('sibling-next'):
        return ref.current.nextElementSibling as T;
      case ('child'):
        return ref.current.firstElementChild as T;
      case ('parent'):
      default:
        return ref.current.parentElement as T;
    }
  };

  return [
    getElement(),
    React.useCallback(React.memo(function Spy({
      children,
      onResize,
      onMutation,
      onScroll,
      onClick,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseOut,
      ...other
    }: PropsWithChildren<SpyProps<T>>) {
      React.useEffect(() => {
        if (!ref.current || typeof window === 'undefined') {
          return () => undefined;
        }
        const cleanUp: (() => void)[] = [];
        const element = getElement();
        // console.log(element);
        if (onResize) {
          const sensor = new ResizeSensor(
            element as T,
            typeof onResize === 'function' ? onResize : () => update(Symbol('__')),
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
              : () => update(Symbol('__')),
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
          { event: 'blur', callback: onBlur },
          { event: 'focus', callback: onFocus },
          { event: 'mouseover', callback: onMouseOver },
          { event: 'mouseout', callback: onMouseOut },
        ].forEach(({ event, callback }) => {
          if (callback) {
            const eventListener = typeof callback === 'function'
              ? callback as EventListener
              : () => update(Symbol('__'));
            (element as T).addEventListener(event, eventListener);

            cleanUp.push(() => {
              (element as T).removeEventListener(event, eventListener);
            });
          }
        });

        return () => {
          cleanUp.forEach(callback => callback());
        };
      }, [
        ref.current,
        onMutation,
        onResize,
        onScroll,
        onClick,
        onFocus,
        onBlur,
        onMouseOver,
        onMouseOut
      ]);

      return (
        <i {...other} ref={ref}>{children}</i>
      );
    }), []),
  ] as [T | null, (props: PropsWithChildren<SpyProps<T>>) => JSX.Element];
}; 