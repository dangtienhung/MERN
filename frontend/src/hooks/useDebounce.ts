import { useEffect, useState } from 'react';

export const useDebounce = (initialize: string = '', delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(initialize);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialize);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialize]);
  return debounceValue;
};
