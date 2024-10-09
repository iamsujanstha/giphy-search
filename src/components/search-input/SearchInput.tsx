import { Icons } from '@/utils/iconConfig';
import styles from './searchInput.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
// import useDebounce from '@/hooks/useDebounce';
import { INPUT_SUGGESTION } from '@/components/suggestion-list/keywords';
import SuggestionList from '@/components/suggestion-list/SuggestionList';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onKeyDown }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(value);

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // useEffect(() => {
  //   onChange(debouncedSearchTerm);
  // }, [debouncedSearchTerm, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => {
    setSearchTerm('');
    onChange('');
    navigate({ search: '' });
  };

  const handleSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    onChange(searchTerm)
    e.stopPropagation();
    if (value.trim()) {
      const encodedQuery = encodeURIComponent(value);
      navigate({
        search: `?query=${encodedQuery}`,
      });
    }
  };

  const suggestedList = useMemo(() => {
    return INPUT_SUGGESTION.filter((word) => word.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm])

  return (
    <div className={styles.search}>
      <div>
        <input
          type="text"
          placeholder="Search all the GIFs"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
        {searchTerm && (
          <span className={styles.close} onClick={handleClose}>
            <Icons.closeIcon size="20" color="white" />
          </span>
        )}
        <div className={styles.iconContainer} onClick={handleSearch}>
          <span className={styles.icon}>
            <Icons.searchIcon size="34" color="white" />
          </span>
        </div>
      </div>
      {suggestedList.length && Boolean(searchTerm) ?
        <SuggestionList
          suggestions={suggestedList}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        /> : ''}
    </div>
  );
};

export default SearchInput;
