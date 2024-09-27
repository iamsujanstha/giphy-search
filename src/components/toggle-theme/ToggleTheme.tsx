import { useEffect } from 'react'
import useSecureStorage from '@/hooks/useSecureStorage';


const THEME_KEY = import.meta.env.VITE_THEME_SECRET_KEY;

const ToggleTheme = () => {
  const [theme, setTheme] = useSecureStorage('theme', 'light', THEME_KEY);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}

export default ToggleTheme