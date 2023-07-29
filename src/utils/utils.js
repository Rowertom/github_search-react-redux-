import { useEffect, useState } from "react";

//хук задержки отправки запроса в поисковике
export const useDebounce = (searchQuery, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchQuery);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);
    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return debounceValue;
};

//функция для пагинации постов
export const slicePosts = (data, countFrom, count) => {
  const newPosts = data.slice(countFrom, count);
  return newPosts;
}