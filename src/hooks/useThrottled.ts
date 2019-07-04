import { Dispatch, useEffect, useRef, useState } from 'react';

export default function useThrottled<T1>(initialValue: T1, limit: number) {
  const [value, setvalue] = useState(initialValue);
  const [throttledValue, setThrottledValue] = useState(initialValue);
  const lastRan = useRef(Date.now());
  const timeLeft = Date.now() - lastRan.current;

  useEffect(
    () => {
      const handler = setTimeout(
        () => {
          setThrottledValue(value);
          lastRan.current = Date.now();
        },
        limit - (Date.now() - lastRan.current),
      );

      return () => {
        clearTimeout(handler);
      };
    },
    [value, timeLeft],
  );

  return [throttledValue, setvalue] as [T1, Dispatch<React.SetStateAction<T1>>];
};
