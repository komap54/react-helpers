import * as React from 'react';

import { _, renderChildren } from '../../utils';

type Children = JSX.Element | (string | JSX.Element)[] | number | string | null;

// tslint:disable-next-line: function-name
export const Case: React.FC<{
  condition: (() => boolean) | boolean,
  break?: boolean,
}> = ({ children, condition }) => {
  return (<>{renderChildren(children)}</>);
};
// tslint:disable-next-line: function-name
export const Default: React.FC = ({ children }) => {
  return (<>{renderChildren(children)}</>);
};

// tslint:disable-next-line: function-name
export function Switch({
  children,
  multiple,
}: {
  children?: Children;
  multiple?: boolean
}) {
  if (!children || children === null) {
    return null;
  }

  if (typeof children === 'string'
    || typeof children === 'number'
    || typeof children === 'boolean'
  ) {
    return <>{children}</>;
  }

  const results: { element: React.ReactNode, type: 'always' | 'condition' | 'default' }[] = [];
  const BreakException = {};

  try {
    React.Children.forEach(children, (child) => {
      if (typeof child === 'string') {
        results.push({
          element: child,
          type: 'always'
        })
      } else if (child.type === Case) {
        if (_(child.props.condition)) {
          results.push({
            element: child,
            type: 'condition'
          })
        }
        if (_(child.props.break)) {
          throw (BreakException);
        }
      } else if (child.type === Default) {
        results.push({
          element: child,
          type: 'default'
        })
      } else {
        results.push({
          element: child,
          type: 'always'
        })
      }
    });
  } catch (e) {
    if (e !== BreakException) {
      throw (e);
    }
  }

  let hasCase = false;
  if (multiple) {
    const result = results.map(({ element, type }) => {
      if (type === 'condition') {
        hasCase = true;
      }
      return type !== 'default' ? element : null;
    });
    if (result.length === 0 || !hasCase) {
      return <>{results.map(({ element }) => element)}</>;
    }
    return <>{result}</>;
  }

  const result = results.map(({ element, type }) => {
    const candidate = type !== 'default' && !hasCase ? element : null;
    if (type === 'condition') {
      hasCase = true;
    }
    return candidate;
  });

  if (result.length === 0 || !hasCase) {
    return <>{results.map(({ element }) => element)}</>;
  }
  return <>{result}</>;
}

export default { Switch, Case, Default };
