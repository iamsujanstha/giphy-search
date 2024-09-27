/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

const useFetch = (baseUrl: string, queryParams: Record<string, string | number> = {}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const url = new URL(baseUrl);
      Object.keys(queryParams).forEach((key) => url.searchParams.append(key, String(queryParams[key])));

      try {
        const response = await fetch('https://api.giphy.com/v1/gifs/trending?rating=pg-13&offset=12&type=undefined&limit=12&api_key=L8eXbxrbPETZxlvgXN9kIEzQ55Df04v0&pingback_id=19232ddfb2b35e17');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, queryParams]);

  return { data, loading, error };
};

export default useFetch;
