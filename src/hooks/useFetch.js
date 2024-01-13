import { useEffect, useState, useCallback } from 'react';

const sendFetch = async (url, config) => {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'Failed to send request');
  }

  return resData;
};

// initialData - do that to data not to be undefined
export const useFetch = (url, config, initialData) => {
  const [data, setData] = useState(initialData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  // ! created this function to clear all data after clicking okay button
  // ! because if not it will not be reset
  const clearData = () => {
    setData(initialData);
  };

  // ! Not to enter an infinite loop
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendFetch(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      }

      setIsLoading(false);
    },
    //   ! If one of them changes, we do not need to create one more function
    //   ! It will be another request with other data
    [url, config],
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) sendRequest();
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest, clearData };
};
