import { useEffect, useState } from 'react';

export default function useDebounce<T1>(value: T1, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
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

  return debouncedValue;
};
