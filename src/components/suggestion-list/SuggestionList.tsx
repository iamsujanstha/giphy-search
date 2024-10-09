import { useNavigate } from 'react-router';
import styles from './suggestionList.module.scss'
import { useState } from 'react';


interface ISuggestionList {
  suggestions: string[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SuggestionList = ({ suggestions, searchTerm, setSearchTerm }: ISuggestionList) => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  const highlightMatch = (word: string) => {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = word.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ color: "black" }}>
          {part}
        </span>
      ) : (
        <span key={index} style={{ color: "gray" }}>
          {part}
        </span>
      )
    );
  };

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const item = e.currentTarget.dataset.item;
    if (item) {
      setSearchTerm(item);
    }
    const encodedQuery = encodeURIComponent(item as string);
    navigate({
      search: `?query=${encodedQuery}`,
    });
    setSelected(true)
  };

  return (
    !selected
    && <div className={styles.suggestion} >
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={handleSelect} data-item={item}>{highlightMatch(item)}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default SuggestionList