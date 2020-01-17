import { useEffect, useState, useRef } from 'react';

export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  const unmounted = useRef(false);

  useEffect(
    () => {
      setMounted(true);
      return () => { unmounted.current = true; };
    },
    [],
  );

  return () => !unmounted.current && mounted;
};
