import { useEffect } from 'react';
import useSecureStorage from '@/hooks/useSecureStorage';
import styles from './toggleTheme.module.scss';

const ToggleTheme = () => {
  const [theme, setTheme] = useSecureStorage('theme', 'dark');

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
  );
};

export default ToggleTheme;
