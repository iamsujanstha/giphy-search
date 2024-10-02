import styles from './tag.module.scss'

const Tag = ({ name }: { name: string }) => {
  return (
    <a className={styles.tag}>
      <h1>#{name}</h1>
    </a>
  )
}

export default Tag