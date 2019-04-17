import { useState, useEffect, useRef } from 'react';

export default <T1>(value: T1, limit: number = 100) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(
    () => {
      const handler = setTimeout(
        () => {
          if (Date.now() - lastRan.current >= limit) {
            setThrottledValue(value);
            lastRan.current = Date.now();
          }
        },
        limit - (Date.now() - lastRan.current),
      );

      return () => {
        clearTimeout(handler);
      };
    },
    [value, limit],
  );

  return throttledValue;
};
