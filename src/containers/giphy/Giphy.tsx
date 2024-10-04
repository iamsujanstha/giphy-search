/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import SearchInput from "@/components/search-input/SearchInput";
import styles from './giphy.module.scss';
import ToggleTheme from "@/components/toggle-theme/ToggleTheme";
import Loader from "@/components/loader/Loader";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icons } from "@/utils/iconConfig";
import { copyToClipboard } from "@/utils/copyToClipboard";
import MessageDrawer from "@/components/drawer/message-drawer/MessageDrawer";
import useDrawer from "@/hooks/useTopDrawer";

const Giphy = () => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const BaseURL = import.meta.env.VITE_API_ENDPOINT_URL;
  const limit = 20;

  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [gifs, setGifs] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [favourite, setFavourite] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  const { isDrawerOpen, drawerContent, openDrawer } = useDrawer();
  const navigate = useNavigate();

  const queryParams = useMemo(() => ({
    api_key: API_KEY,
    q: searchValue || 'trending',
    limit,
    offset: page * limit,
  }), [API_KEY, limit, page, searchValue]);

  const { data, error, loading } = useFetch(BaseURL, queryParams);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setPage(0);
      setSearchValue(decodeURIComponent(query));
    } else {
      setSearchValue('');
    }
  }, [location.search]);

  useEffect(() => {
    if (data && page === 0) {
      setGifs(data.data);
    } else if (data && gifs.length <= data.pagination.total_count) {
      setGifs(prevGifs => {
        const newGifs = data.data.filter((newGif: any) =>
          !prevGifs.some(prevGif => prevGif.id === newGif.id)
        );
        return [...prevGifs, ...newGifs];
      });
    }
    setHasMore(gifs.length < data?.pagination?.total_count);
  }, [data, page]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setPage(0);
    setGifs([]);
    setHasMore(true);
  }, []);

  const handleCopy = (url: string) => async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(url);
    if (success) {
      openDrawer("Link copied to Clipboard.");
    }
  };

  const handleFavorite = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourite((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const fetchMoreGifs = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderGifs = () => {
    return gifs.map((ele: any, index: number) => (
      <div
        className={styles.images}
        key={`${ele.id}-${index}`}
        onClick={() => navigate(`/gifs/${ele.slug}`, { state: { gifData: ele } })}
      >
        <div className={styles.img}>
          <picture>
            <source srcSet={ele.images.fixed_width.webp} type="image/webp" />
            <source srcSet={ele.images.fixed_width.url} type="image/jpeg" />
            <img
              src={ele.images.fixed_width.webP}
              alt={ele.title}
              onLoad={() => setLoadingImages(prev => ({ ...prev, [ele.id]: false }))}
              onError={() => setLoadingImages(prev => ({ ...prev, [ele.id]: false }))}
              style={{ display: loadingImages[ele.id] ? 'none' : 'block' }}
              onLoadStart={() => setLoadingImages(prev => ({ ...prev, [ele.id]: true }))}
              loading="lazy"
            />
          </picture>
          {loadingImages[ele.id] && <div className={styles.loadingCard}></div>}
          <span className={styles.icons}>
            <span onClick={handleFavorite(ele.id)}>
              <Icons.favouriteIcon
                size="20"
                color={favourite.find((id) => id === ele.id) ? 'red' : ''}
              />
            </span>
            <span onClick={handleCopy(ele?.images?.fixed_width.url)}>
              <Icons.linkIcon size="20" />
            </span>
          </span>
          <span className={styles.userDetail}>
            <img src={ele?.user?.avatar_url} alt={ele?.user?.name} loading="lazy" />
            <p>{ele?.user?.display_name} <span>{ele?.user?.is_verified && <Icons.verifiedIcon size="14" />}</span></p>
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
          dataLength={gifs.length}
          next={fetchMoreGifs}
          hasMore={hasMore}
          loader={<p></p>}
          endMessage={<p className={styles.endMessage}></p>}
          className={styles.infiniteScroll}
        >
          {renderGifs()}
          {error && <p>Fetch data Error</p>}
        </InfiniteScroll>
      </section>
      {loading && <Loader />}
      {!data?.data.length && !loading && <p>No Data Found.</p>}
      {isDrawerOpen && (
        <MessageDrawer isOpen={isDrawerOpen} content={drawerContent} />
      )}
    </div>
  );
};

export default Giphy;
