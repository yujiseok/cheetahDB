import { useEffect, useState } from "react";

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
export default useLocalStorage;
