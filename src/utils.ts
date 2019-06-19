import * as React from 'react';

// tslint:disable-next-line: function-name
export function _<T1>(arg: (() => T1) | T1) {
  if (typeof arg === 'function') {
    return (arg as (() => T1))();
  }
  return arg;
}

export function renderChildren(
  children?: (() => React.ReactNode) | React.ReactNode,
): React.ReactNode {
  if (!children) {
    return null;
  }
  return _(children);
}

