import * as React from 'react';

export type Children = (() => React.ReactNode) | React.ReactNode;
export type Direction = 'parent' | 'child' | 'sibling-next' | 'sibling-previous' | string;

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

export function getElement<T extends HTMLElement>(ref: HTMLElement | null, direction: Direction) {
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
      return ref.parentElement as T;
    default:
      return ref.querySelector(direction as string) as T;
  }
};
