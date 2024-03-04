'use client'
import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        // Check if running in a browser environment
        if (typeof window === 'undefined') {
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        }

        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        // Ensure localStorage is only accessed in a client-side environment
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue] as [T, typeof setValue];
}