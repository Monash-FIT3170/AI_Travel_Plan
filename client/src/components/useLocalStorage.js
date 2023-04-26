// https://blog.logrocket.com/using-localstorage-react-hooks/

import { useEffect, useState } from "react";

function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem(key);
    console.log(typeof saved)
    const initialValue = saved !== null ? saved : defaultValue;
    return initialValue;
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}