import { debounce } from "lodash";
import { useEffect,useRef, useMemo } from "react";

const useDebounce = <T extends (...args: unknown[]) => void>(callback: T, delay = 1000) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};
export default useDebounce;