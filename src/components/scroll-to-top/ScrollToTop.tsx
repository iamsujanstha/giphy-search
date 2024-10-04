import { Icons } from "@/utils/iconConfig";
import styles from './scrollToTop.module.scss';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div className={styles.scrollToTop} onClick={handleScrollTop}>
          <Icons.scrollTopIcon size="46" color="var(--scroll-top-color)" />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
