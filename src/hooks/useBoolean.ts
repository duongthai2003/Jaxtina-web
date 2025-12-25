import { useState, useMemo } from 'react';

export const useBoolean = (
  initValue = false,
): [boolean, () => void, () => void] => {
  const [value, setValue] = useState(initValue);

  const { setTrue, setFalse } = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
    }),
    [],
  );
  return [value, setTrue, setFalse];
};
