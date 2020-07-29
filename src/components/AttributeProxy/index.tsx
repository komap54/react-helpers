import * as React from 'react';

import { Direction, getElement } from '../../utils';

export interface AttributeProxyTypes<T> extends React.HTMLProps<T> {
  direction: Direction;
  component?: React.ComponentType<any> | string;
};

export const AttributeProxy = React.memo(function Attr<T extends HTMLElement = HTMLDivElement>({
  component: Component = 'div',
  direction,
  children,
  ...props
}: React.PropsWithChildren<AttributeProxyTypes<T>>) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!ref.current || typeof window === 'undefined') {
      return () => undefined;
    }
    const element = getElement<T>(ref.current, direction) as T;

    if (!element) {
      return () => undefined;
    }

    const { className, style, ...rest } = props;

    if (className && !element.classList.contains(className)) {
      element.classList.add(className);
    }

    if (style) {
      Object.assign(element.style, style);
    }

    Object.entries(rest).forEach(([attr, value]) => {
      element.setAttribute(attr, value);
    });

    return () => {
      if (className) {
        element.classList.remove(className);
      }
    };
  }, [props, direction]);

  return <Component ref={ref}>{children}</Component>;
});
