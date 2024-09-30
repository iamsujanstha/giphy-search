import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './messageDrawer.module.scss';

interface IMessageDrawer {
  isOpen: boolean;
  content: string;
}

const MessageDrawer: React.FC<IMessageDrawer> = ({ isOpen, content }) => {
  const [showMsg, setShowMsg] = useState(isOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMsg(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showMsg]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.msgDrawer} ${showMsg ? styles.isOpen : ''}`}>
      {content}
    </div>,
    document.body
  );
};

export default MessageDrawer;
