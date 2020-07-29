import { useState, useRef, useCallback, useEffect } from 'react';
import { act } from '@testing-library/react';

export default function useDebounced<T1>(initialValue: T1, delay: number) {
  const timeout = useRef<number>();
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const setValue = useCallback((candidate) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(
      () => {
        act(() => setDebouncedValue(candidate));
      },
      delay,
    ) as unknown as number;
  }, [delay]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [
    debouncedValue,
    setValue,
  ] as [T1, React.Dispatch<React.SetStateAction<T1>>];
};
