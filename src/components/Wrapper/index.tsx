import * as React from 'react';

import { _ } from '../../utils';

type Children = (() => JSX.Element) | JSX.Element | JSX.Element[] | number | string | null | undefined;

export type CommonWrapperProps = {
  condition: boolean | (() => boolean);
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
  condition,
  children,
  ...other
}) => {
  const { wrapper: WrapperComponent } = other as WrapperPropsWithWrapper;
  const { wrap } = other as WrapperPropsWithWrapFunc;

  const content = typeof children === 'function'
    ? children()
    : <>{children}</>;

  if (_(condition)) {
    if (WrapperComponent) {
      return (
        <WrapperComponent>
          {content}
        </WrapperComponent>
      );
    }
    if (wrap) {
      return <>{wrap(content)}</>;
    }
  }
  return <>{content}</>;
};

export default Wrapper;
