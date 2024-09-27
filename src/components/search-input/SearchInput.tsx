import { Icons } from '@/utils/iconConfig'
import styles from './searchInput.module.scss'
import { useState } from 'react'

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchValue(e.target.value)
  }

  const handleSubmit = () => {
    console.log(searchValue)
  }

  const handleClose = () => {
    setSearchValue('')
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder='Search all the GIFs and Stickers'
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue &&
        <span className={styles.close} onClick={handleClose}>
          <Icons.CloseIcon size='20' color='white' />
        </span>
      }
      <div className={styles.iconContainer}>
        <span className={styles.icon} onClick={handleSubmit}>
          <Icons.SearchIcon size='34' color='white' />
        </span>
      </div>
    </div>
  )
}

export default SearchInput