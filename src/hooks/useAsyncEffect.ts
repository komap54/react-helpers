import { useEffect, DependencyList } from 'react';

export default function useAsyncEffect(
  effect: () => Promise<void | (() => void | undefined)>,
  deps?: DependencyList,
) {
  useEffect(() => {
    let cleanup = () => { };
    effect().then(newCleanup => {
      if (newCleanup && typeof newCleanup === 'function') {
        cleanup = newCleanup;
      }
    });
    return () => cleanup();
  }, deps);
};
