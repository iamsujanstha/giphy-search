
import { useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";

const Giphy = () => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const BaseURL = import.meta.env.VITE_API_ENDPOINT_URL;
  const [page, setPage] = useState(0);
  const limit = 10;

  const queryParams = useMemo(() => ({
    api_key: apiKey,
    limit,
    offset: page * limit,
  }), [apiKey, limit, page]);

  const { data, loading, error } = useFetch(BaseURL, queryParams);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Trending Gifs</h1>
      {/* <ul>
        {data?.data.map((gif: any) => (
          <li key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </li>
        ))}
      </ul> */}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={data?.pagination?.total_count <= (page + 1) * limit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Giphy;
