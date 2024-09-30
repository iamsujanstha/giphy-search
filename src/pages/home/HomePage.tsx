import Giphy from '@/containers/giphy/Giphy';
// import { Icons } from '@/utils/iconConfig';
import styles from './homepage.module.scss'
import MessageDrawer from '@/components/drawer/message-drawer/MessageDrawer';
// import ToastMessage from '@/components/toast-message/ToastMessage';

const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* <ToastMessage message='test' /> */}
      <Giphy />
      <MessageDrawer isOpen content='data' />
    </div>
  )
}

export default HomePage