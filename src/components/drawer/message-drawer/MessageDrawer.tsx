import React from 'react';
import ReactDOM from 'react-dom';
import styles from './messageDrawer.module.scss';

interface IMessageDrawer {
  isOpen: boolean;
  content: string;
}

const MessageDrawer: React.FC<IMessageDrawer> = ({ isOpen, content }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`${styles.msgDrawer} ${isOpen ? styles.isOpen : ''}`}>
      {content}
    </div>,
    document.body
  );
};

export default MessageDrawer;
