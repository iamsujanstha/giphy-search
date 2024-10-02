import Giphy from '@/containers/giphy/Giphy';
import styles from './homepage.module.scss'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Giphy />
    </div>
  )
}

export default HomePage