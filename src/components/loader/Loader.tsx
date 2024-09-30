import React from 'react'
import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
    </div>
  )
}

export default Loader