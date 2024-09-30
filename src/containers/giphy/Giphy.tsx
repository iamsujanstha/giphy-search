/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import SearchInput from "@/components/search-input/SearchInput";
import styles from './giphy.module.scss';
import ToggleTheme from "@/components/toggle-theme/ToggleTheme";
import Loader from "@/components/loader/Loader";
import ToastMessage from "@/components/toast-message/ToastMessage";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icons } from "@/utils/iconConfig";
import { copyToClipboard } from "@/utils/copyToClipboard";
import MessageDrawer from "@/components/drawer/message-drawer/MessageDrawer";


const Giphy = () => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const BaseURL = import.meta.env.VITE_API_ENDPOINT_URL;
  const limit = 20;

  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const queryParams = useMemo(() => ({
    api_key: API_KEY,
    q: searchValue ?? '',
    limit,
    offset: page * limit,
  }), [API_KEY, limit, page, searchValue]);

  const { data, error, loading } = useFetch(BaseURL, queryParams);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      console.log('trigger', query);
      setPage(0);
      setSearchValue(decodeURIComponent(query));
    } else {
      setSearchValue('');
    }
  }, [location.search]);

  useEffect(() => {
    if (data?.data) {
      setGifs(prevGifs => (page === 0 ? data.data : [...prevGifs, ...data.data]));
      setHasMore(gifs.length < data.pagination.total_count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setPage(0);
    setGifs([]);
    setHasMore(true);
  }, []);

  // Curried function to handle copy action
  const handleCopy = (url: string) => {
    return async () => {
      const success = await copyToClipboard(url);
      if (success) {
        <MessageDrawer isOpen content="Link copied to Clipboard" />
      }
    }
  };

  const fetchMoreGifs = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderGifs = () => {
    return gifs.map((ele: any, index: number) => (
      <div className={styles.images} key={`${ele.id}-${index}`} >
        <div className={styles.img}>
          <img src={ele.images.fixed_width.url} alt={ele.title} />
          <span className={styles.icons}>
            <span><Icons.favouriteIcon size="24" /></span>
            <span onClick={handleCopy(ele.images.fixed_width.url)} ><Icons.linkIcon size="20" onClick={() => copyToClipboard(ele.images.fixed_width.url)} /></span>
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
      <section className={styles.gifListContainer}>
        <InfiniteScroll
          dataLength={gifs.length} // This is important field to render the next data
          next={fetchMoreGifs}
          hasMore={hasMore}
          loader={<Loader />}
          style={{ width: 'var(--searchbar-width)', columns: '4', overflow: 'hidden' }}
          endMessage={'No More Gifs'}
        >
          {renderGifs()}
          {error && <ToastMessage message={error} open={Boolean(error)} />}
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default Giphy;
