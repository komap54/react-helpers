import * as React from 'react';

const Freeze: React.FunctionComponent<{ enabled?: boolean }> = ({
  enabled,
  children,
}) => {
  // tslint:disable-next-line: no-boolean-literal-compare
  const shouldUpdate = enabled === false ? 'no' : Symbol('yes');
  return React.useMemo(() => <>{children}</>, [shouldUpdate]);
};

export default Freeze;
