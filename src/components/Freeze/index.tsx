import * as React from 'react';

export const Freeze: React.FunctionComponent<{ enabled?: boolean }> = ({
  enabled,
  children,
}) => {
  // tslint:disable-next-line: no-boolean-literal-compare
  const shouldUpdate = enabled === false ? Symbol('yes') : 'no';
  return React.useMemo(() => <>{children}</>, [shouldUpdate]);
};

export default Freeze;
