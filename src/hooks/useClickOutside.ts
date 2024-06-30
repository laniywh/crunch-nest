import { useEffect, useRef } from "react";

export function useClickOutside(handler: () => void) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [ref, handler]);

  return ref;
}
