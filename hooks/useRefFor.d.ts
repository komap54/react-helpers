import * as React from 'react';
export default function useRefFor<T1>(Component: React.ComponentType<T1>): [React.RefObject<T1>, React.ComponentType<T1>];
