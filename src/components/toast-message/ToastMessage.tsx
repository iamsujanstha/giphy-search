import { Icons } from '@/utils/iconConfig';
import styles from './toast-message.module.scss'
import { useState } from 'react';

interface IToastMessage {
  message: string;
  open: boolean;
}
const ToastMessage = ({ message, open }: IToastMessage) => {
  const [showTaost, setShowToast] = useState(open);

  const handleClose = () => {
    setShowToast(false);
  }

  return (
    <div className={styles.toast} style={{ display: showTaost ? 'block' : 'none' }}>
      {message}
      <span className={styles.close} onClick={handleClose}><Icons.CloseIcon /></span>
    </div>
  )
}

export default ToastMessage