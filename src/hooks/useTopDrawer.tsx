import { useState, useCallback } from 'react';

const useDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const openDrawer = useCallback((content: string) => {
    setDrawerContent(content);
    setIsDrawerOpen(true);

    // Automatically close the drawer after 4 seconds
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 4000);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return { isDrawerOpen, drawerContent, openDrawer, closeDrawer };
};

export default useDrawer;
