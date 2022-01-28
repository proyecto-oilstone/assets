import { useEffect, useState } from "react";

const useSize = (ref) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref) {
      const resizeObserver = new ResizeObserver(entries => {
        setWidth(entries[0].target.clientWidth);
        setHeight(entries[0].target.clientHeight);
      });
      
      resizeObserver.observe(ref.current);
      
      return () => {
        resizeObserver.disconnect();
      }
    }
  }, [ref]);

  return { width, height };
}

export default useSize;
