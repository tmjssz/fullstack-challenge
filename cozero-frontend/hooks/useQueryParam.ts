import { useSearchParams } from "react-router-dom";

export const useQueryParam = (
  name: string
): [string | null, (value: string) => void] => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get(name);
  const setQueryParam = (value: string) => searchParams.set(name, value);
  return [queryParam, setQueryParam];
};
