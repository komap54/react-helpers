import * as React from 'react';

export default function useRefFor<T1>(Component: React.ComponentType<T1>) {
  const ref = React.useRef<T1>(null);
  const EnhancedComponent = React.useCallback(
    props => (
      <Component ref={ref} inputRef={ref} {...props} />
    ),
    [],
  );

  return [ref, EnhancedComponent] as [React.Ref<T1>, React.ComponentType<T1>]
}
