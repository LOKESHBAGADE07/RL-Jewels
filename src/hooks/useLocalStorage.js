import { useEffect, useState } from 'react';
export function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        if (typeof window === 'undefined')
            return initial;
        try {
            const raw = window.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : initial;
        }
        catch {
            return initial;
        }
    });
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch {
            /* ignore */
        }
    }, [key, value]);
    return [value, setValue];
}
export default useLocalStorage;
