import * as React from 'react';

import { _, renderChildren, Children } from '../../utils';

export const Then = ({ children }: { children?: Children }) => {
  return (<>{renderChildren(children)}</>);
};
export const Else = ({ children }: { children?: Children }) => {
  return (<>{renderChildren(children)}</>);
};

export function If({
  condition,
  children,
}: {
  condition: boolean | (() => boolean);
  children?: Children;
}) {
  if (!children || children === null) {
    return null;
  }

  if (typeof children === 'function') {
    return _(condition) ? <>{children()}</> : null;
  }

  if (typeof children === 'string'
    || typeof children === 'number'
    || typeof children === 'boolean'
    || (!Array.isArray(children) && (children as any).type !== (<Else />).type)
  ) {
    return _(condition) ? <>{children}</> : null;
  }
  const options = (Array.isArray(children) ? children : [children]);

  if (_(condition)) {
    return (
      <>
        {options.filter(child => ((child as any).type !== (<Else />).type)) || null}
      </>
    );
  }

  return (
    <>
      {options.filter(child => ((child as any).type !== (<Then />).type)) || null}
    </>
  );
}

export default { If, Then, Else };
