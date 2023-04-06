import { useState } from 'react';

export const useToggleModal = (initial = false) => {
  const [value, setValue] = useState(initial);
  const handleToggleValue = () => setValue(!value);
  return { value, handleToggleValue };
};
