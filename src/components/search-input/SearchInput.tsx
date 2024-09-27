import { Icons } from '@/utils/iconConfig';
import styles from './searchInput.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClose = () => {
    onChange('');
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder='Search all the GIFs'
        value={value}
        onChange={handleChange}
      />
      {value && (
        <span className={styles.close} onClick={handleClose}>
          <Icons.CloseIcon size='20' color='white' />
        </span>
      )}
      <div className={styles.iconContainer}>
        <span className={styles.icon}>
          <Icons.SearchIcon size='34' color='white' />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
