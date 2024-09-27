
import { useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import SearchInput from "@/components/search-input/SearchInput";
import styles from './giphy.module.scss';
import ToggleTheme from "@/components/toggle-theme/ToggleTheme";

const Giphy = () => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const BaseURL = import.meta.env.VITE_API_ENDPOINT_URL;
  const [page,] = useState(0);
  const limit = 10;

  const queryParams = useMemo(() => ({
    api_key: apiKey,
    limit,
    offset: page * limit,
  }), [apiKey, limit, page]);

  const { data, loading, error } = useFetch(BaseURL, queryParams);
  console.log(loading, error, data)

  const renderGifs = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data?.data?.map((ele: any) => {
      return (
        <div className={styles.images}>
          <img src={ele.images.fixed_width.url} />
        </div>
      )
    })
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <section>
          <h1>GIFY SEARCH <span><ToggleTheme /></span></h1>
          <SearchInput />
        </section>
      </form >
      <section >
        {renderGifs()}
      </section>
    </div>

  );
};

export default Giphy;
