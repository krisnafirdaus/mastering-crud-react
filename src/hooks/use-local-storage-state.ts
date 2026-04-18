"use client"

import { useEffect, useState } from "react"

export function useLocalStorageState<T>(key: string, initialValue: T){
    const [state, setState] = useState<T>(() => {
        if(typeof window === "undefined"){
            return initialValue;
        }

        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue !== null ? (JSON.parse(storedValue) as T) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;

}