import { Icons } from '@/utils/iconConfig';
import styles from './searchInput.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onKeyDown }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(value);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => {
    setSearchTerm('');
    onChange('');
    navigate({ search: '' });
  };

  const handleSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (value.trim()) {
      const encodedQuery = encodeURIComponent(value);
      navigate({
        search: `?query=${encodedQuery}`,
      });
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search all the GIFs"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      {searchTerm && (
        <span className={styles.close} onClick={handleClose}>
          <Icons.CloseIcon size="20" color="white" />
        </span>
      )}
      <div className={styles.iconContainer} onClick={handleSearch}>
        <span className={styles.icon}>
          <Icons.SearchIcon size="34" color="white" />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
