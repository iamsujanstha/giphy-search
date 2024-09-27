import { useEffect } from 'react'
import useSecureStorage from '@/hooks/useSecureStorage';
import styles from './toggleTheme.module.scss'


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
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      style={{ background: `${theme === 'dark' ? "rgba(255,255,255,1)" : "#333"}` }}
    >
      <div
        className={styles.btn}
        style={{
          marginLeft: `${theme === 'dark' ? "53px" : "2px"}`,
          background: `${theme === 'dark' ? "#333" : "#fff"}`
        }}
      />
    </button>
  )
}

export default ToggleTheme