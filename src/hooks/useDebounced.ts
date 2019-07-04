import { useEffect, useState } from 'react';

export default function useDebounced<T1>(initialValue: T1, delay: number) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  useEffect(
    () => {
      const handler = setTimeout(
        () => {
          setDebouncedValue(value);
        },
        delay,
      );

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay],
  );

  return [debouncedValue, setValue] as [T1, React.Dispatch<React.SetStateAction<T1>>];
};
