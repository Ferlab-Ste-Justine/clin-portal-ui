import { useEffect, useState } from 'react';

const useElementSize = (elementID: string) => {
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const targetDiv = document.getElementById(elementID);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setDimensions({ x: entry.contentRect.width, y: entry.contentRect.height });
    });

    if (targetDiv) {
      resizeObserver.observe(targetDiv);
    }

    return () => {
      if (targetDiv) {
        resizeObserver.disconnect();
      }
    };
  }, []);
  return dimensions;
};
export default useElementSize;
