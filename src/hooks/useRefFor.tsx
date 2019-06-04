import * as React from 'react';

export default function useRefFor<T1>(Component: React.ComponentType<T1>) {
  const ref = React.useRef<T1>(null);
  const EnhancedComponent: React.ComponentType<T1> = React.useCallback(
    props => (
      <Component ref={ref} inputRef={ref} {...props} />
    ),
    [],
  );

  EnhancedComponent.displayName = `${Component.displayName}WithRef`;

  return [ref, EnhancedComponent] as [React.RefObject<T1>, React.ComponentType<T1>];
}
