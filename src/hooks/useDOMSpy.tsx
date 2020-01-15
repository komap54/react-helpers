import React, { useRef } from 'react';
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

export default function <T extends HTMLElement>() {
  const ref = useRef<HTMLSpanElement>(null);
  const [, update] = React.useState(Symbol('__'));
  useMounted();

  return [
    ref.current && ref.current.parentElement,
    React.useCallback(React.memo(function Spy({
      onResize,
      onMutation,
      onScroll,
      onClick,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseOut,
    }: SpyProps<T>) {
      // handle resize event
      React.useEffect(() => {
        if (!ref.current || typeof window !== 'undefined') {
          return () => undefined;
        }
        const cleanUp: (() => void)[] = [];
        const parent = ref.current.parentElement as T;

        if (onResize) {
          const sensor = new ResizeSensor(
            parent,
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
          observer.observe(parent, {
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
            parent.addEventListener(event, eventListener);

            cleanUp.push(() => {
              parent.removeEventListener(event, eventListener);
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
        <i ref={ref} />
      );
    }), []),
  ] as [T | null, (props: SpyProps<T>) => JSX.Element];
}; 