import * as React from 'react';

import { _ } from '../../utils';

type Children = (() => JSX.Element) | JSX.Element | JSX.Element[] | number | string | null | undefined;

export type CommonWrapperProps = {
  in: boolean | (() => boolean);
  children?: Children;
};

export type WrapperPropsWithWrapper = {
  wrapper: React.JSXElementConstructor<{ children: Children }>;
} & CommonWrapperProps;

export type WrapperPropsWithWrapFunc = {
  wrap?: (children: Children) => JSX.Element;
} & CommonWrapperProps;

// tslint:disable-next-line: function-name
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Wrapper: React.JSXElementConstructor<WrapperPropsWithWrapper | WrapperPropsWithWrapFunc> = ({
  in: condition,
  children,
  ...other
}) => {
  const { wrapper: WrapperComponent } = other as WrapperPropsWithWrapper;
  const { wrap } = other as WrapperPropsWithWrapFunc;

  const inner = typeof children === 'function'
    ? children()
    : <>{children}</>;

  if (_(condition)) {
    if (WrapperComponent) {
      return (
        <WrapperComponent>
          {inner}
        </WrapperComponent>
      );
    }
    if (wrap) {
      return <>{wrap(inner)}</>;
    }
    return <>{inner}</>;
  }
  return <>{null}</>;
};

export default Wrapper;
