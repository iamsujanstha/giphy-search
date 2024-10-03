import { useState } from 'react';

const useSecureStorage = (key: string, initialValue: string) => {
  const getStoredValue = () => {
    const encodedData = localStorage.getItem(btoa(key));
    if (!encodedData) return initialValue;

    try {
      return JSON.parse(atob(encodedData));
    } catch (error) {
      console.error('Failed to parse stored value:', error);
      return initialValue; // Return initial value if parsing fails
    }
  };

  const [storedValue, setStoredValue] = useState<string>(getStoredValue);

  const setValue = (value: string | ((prevValue: string) => string)) => {
    const valueToStore = typeof value === 'function' ? value(storedValue) : value;
    try {
      localStorage.setItem(btoa(key), btoa(JSON.stringify(valueToStore)));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Failed to store value:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export default useSecureStorage;
