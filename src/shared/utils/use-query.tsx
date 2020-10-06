import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type useQueryHook = <T>() => T;
export const useQuery = function () {
  const { search } = useLocation();

  const initialSearchParams = extractSearchParams(search);

  const [searchParams, setSearchParams] = useState(initialSearchParams);

  useEffect(() => {
    const newSearchParams = extractSearchParams(search);
    setSearchParams(newSearchParams);
  }, [search]);

  return searchParams;
};

const extractSearchParams = (search: string): { [key: string]: string } => {
  const queryEntries = new URLSearchParams(search);
  const params: { [key: string]: string } = {};
  queryEntries.forEach((value: string, key: string): void => {
    params[key] = value;
  });
  return params;
};
