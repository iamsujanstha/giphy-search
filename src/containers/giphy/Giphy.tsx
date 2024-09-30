/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import SearchInput from "@/components/search-input/SearchInput";
import ReactPaginate from "react-paginate";
import styles from './giphy.module.scss';
import ToggleTheme from "@/components/toggle-theme/ToggleTheme";

const Giphy = () => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const BaseURL = import.meta.env.VITE_API_ENDPOINT_URL;
  const limit = 20;
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const queryParams = useMemo(() => ({
    api_key: API_KEY,
    q: searchValue,
    limit,
    offset: page * limit,
  }), [API_KEY, limit, page, searchValue]);

  const { data, error, loading } = useFetch(BaseURL, queryParams);

  const totalPages = useMemo(() => {
    if (data?.pagination?.total_count) {
      return Math.ceil(data.pagination.total_count / limit);
    }
    return 0;
  }, [data, limit]);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchValue(decodeURIComponent(query));
    } else {
      setSearchValue('');
    }
  }, [location.search]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(0); // Reset page to 0 on search submit
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handlePageClick = useCallback(({ selected }: { selected: any }) => {
    setPage(selected);
  }, []);

  const renderGifs = () => {
    return data?.data?.map((ele: any) => (
      <div className={styles.images} key={ele.id}>
        <img src={ele.images.fixed_width.url} alt={ele.title} />
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section>
          <div className={styles.title}>
            <h1>GIPHY SEARCH</h1>
            <ToggleTheme />
          </div>
          <SearchInput
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          />
        </section>
      </form>
      <section style={{ height: "105vh", overflowY: "auto" }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {renderGifs()}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeLinkClassName={styles.active}
          pageLinkClassName={styles.pageLink}
          previousLinkClassName={styles.pageLink}
          nextLinkClassName={styles.pageLink}
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      )}
    </div>
  );
};

export default Giphy;
