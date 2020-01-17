import React, { useRef, PropsWithChildren } from 'react';
import useMounted from './useMounted';
import { getElement, EventProxy, EventProxyProps } from '../components/EventProxy';

export default function <T extends HTMLElement>(
  direction: 'parent' | 'child' | 'sibling-next' | 'sibling-previous' = 'parent'
) {
  const ref = useRef<HTMLElement>(null);
  const [, update] = React.useState(Symbol('__'));
  useMounted();

  return [
    getElement(ref.current, direction),
    React.useCallback(React.memo(function Spy(props: PropsWithChildren<EventProxyProps>) {
      return (
        <EventProxy
          component="i"
          direction={direction}
          {...(
            Object.entries(props)
              .reduce((acc, [key, value]) => {
                if (/^on[A-Z]+/.test(key) && typeof value !== 'function') {
                  return { ...acc, [key]: () => update(Symbol('__')) };
                }
                return { ...acc, [key]: value };
              }, {} as EventProxyProps)
          )}
        />
      );
    }), []),
  ] as [T | null, (props: PropsWithChildren<EventProxyProps>) => JSX.Element];
}; 