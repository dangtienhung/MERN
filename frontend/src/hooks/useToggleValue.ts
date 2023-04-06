import { useState } from 'react';

export const useToggleModal = (initial = false) => {
  const [value, setValue] = useState<boolean>(initial);
  const handleToggleValue = (toggle?: boolean) => setValue(toggle || !value);
  return { value, handleToggleValue };
};
