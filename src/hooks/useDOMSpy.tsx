import React, { useRef } from 'react';
import ResizeSensor, { ResizeSensorCallback } from 'css-element-queries/src/ResizeSensor';
import useMounted from './useMounted';

export type SpyProps = {
  onResize?: boolean | ResizeSensorCallback;
};

export default function <T extends Element>() {
  const ref = useRef<HTMLMetaElement>(null);
  const [, update] = React.useState(Symbol('__'));
  useMounted();

  return [
    ref.current && ref.current.parentNode,
    React.useCallback(React.memo(function Spy({ onResize }: SpyProps) {
      React.useEffect(() => {
        if (!ref.current) {
          return () => undefined;
        }
        const cleanUp: (() => void)[] = [];

        // const element = ref.current;
        const parent = ref.current.parentElement as HTMLElement;

        if (onResize) {
          const sensor = new ResizeSensor(
            parent,
            typeof onResize === 'function' ? onResize : () => update(Symbol('__')),
          );
          cleanUp.push(() => {
            sensor.detach();
          });
        }

        return () => {
          cleanUp.forEach(callback => callback());
        };
      }, [ref.current, onResize]);


      return (
        <meta ref={ref} />
      );
    }), []),
  ] as [T | null, (props: SpyProps) => JSX.Element];
}; 