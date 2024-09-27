import { useMemo, useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import SearchInput from "@/components/search-input/SearchInput";
import styles from './giphy.module.scss';
import ToggleTheme from "@/components/toggle-theme/ToggleTheme";

const Giphy = () => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const BaseURL = import.meta.env.VITE_API_ENDPOINT_URL;
  const [page,] = useState(0);
  const limit = 10;

  const [searchValue, setSearchValue] = useState('');

  const queryParams = useMemo(() => ({
    api_key: API_KEY,
    q: searchValue, // Use searchValue in the query params
    limit,
    offset: page * limit,
  }), [API_KEY, limit, page, searchValue]);

  const { data, loading, error } = useFetch(BaseURL, queryParams);
  console.log(loading, error, data);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const renderGifs = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data?.data?.map((ele: any) => {
      return (
        <div className={styles.images} key={ele.id}>
          <img src={ele.images.fixed_width.url} />
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section>
          <h1>GIFY SEARCH <span><ToggleTheme /></span></h1>
          <SearchInput value={searchValue} onChange={handleSearchChange} />
        </section>
      </form>
      <section>
        {renderGifs()}
      </section>
    </div>
  );
};

export default Giphy;
