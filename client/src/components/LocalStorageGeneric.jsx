import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }, [key, value]);

  const updateValueInLocalStorage = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  };


  return [value, setValue, updateValueInLocalStorage];
}
