/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

const useFetch = (baseUrl: string, queryParams: Record<string, string | number> = {}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!baseUrl || !queryParams) return;

    const url = new URL(baseUrl);

    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (value) {
        url.searchParams.append(key, String(value));
      }
    });

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url.toString());
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

  }, [queryParams, baseUrl]);

  return { data, loading, error };
};

export default useFetch;
