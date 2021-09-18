import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setIsFetching(true);
    setData(null);
    setError(null);

    const fetchGeoData = async () => {
      try {
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error("invalid IPv4 or IPv6 address.");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    setTimeout(fetchGeoData, 2000);
    return () => controller.abort();
  }, [url]);

  return { data, error, isFetching };
};

export default useFetch;
