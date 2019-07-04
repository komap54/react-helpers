import * as React from 'react';

import { _, renderChildren } from '../../utils';

type Children = (() => JSX.Element) | JSX.Element | JSX.Element[] | number | string | null;

// tslint:disable-next-line: function-name
export const Then: React.FC = ({ children }) => {
  return (<>{renderChildren(children)}</>);
};
// tslint:disable-next-line: function-name
export const Else: React.FC = ({ children }) => {
  return (<>{renderChildren(children)}</>);
};

// tslint:disable-next-line: function-name
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
    || (!Array.isArray(children) && children.type !== (<Else />).type)
  ) {
    return _(condition) ? <>{children}</> : null;
  }
  const options = (Array.isArray(children) ? children : [children]);

  if (_(condition)) {
    return (
      <>
        {options.filter(child => (child.type !== (<Else />).type)) || null}
      </>
    );
  }

  return (
    <>
      {options.filter(child => (child.type !== (<Then />).type)) || null}
    </>
  );
}

export default { If, Then, Else };
