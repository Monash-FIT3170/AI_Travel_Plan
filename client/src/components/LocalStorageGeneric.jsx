import { useState } from "react";


/**
 * The function provides a generic use to interact with the browser localStorage
 * If you try to access the value stored in localStorage, do the following:
 * [value, setValue, updateLocalStorage] = useLocalStorage(key, defaultValue)
 * Take a look at StorageEventGeneral.jsx on its usage
 * @param {*} key The key of the data
 * @param {*} defaultValue default Mock Data
 * @returns the data either from localStorage (if previously stored) or the default data we provided, and the function to update localStorage
 */
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
