import * as React from 'react';

import { _, renderChildren } from '../../utils';
import { Dictionary } from 'lodash';

type Children = JSX.Element | JSX.Element[] | number | string | null;

// tslint:disable-next-line: function-name
export const Case: React.FC = ({ children }) => {
  return (<>{renderChildren(children)}</>);
};
// tslint:disable-next-line: function-name
export const Default: React.FC = ({ children }) => {
  return (<>{renderChildren(children)}</>);
};

// tslint:disable-next-line: function-name
export function Switch({
  children,
}: {
  children?: Children;
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

  const result: Dictionary<JSX.Element | null> = { case: null, default: null };

  React.Children.forEach(children, (child) => {
    if (!result.case && child.type === Case) {
      if (_(child.props.condition)) {
        result.case = child;
      }
    } else if (!result.default && child.type === Default) {
      result.default = child;
    }
  });

  return result.case || result.default || null;
}

export default { Switch, Case, Default };
