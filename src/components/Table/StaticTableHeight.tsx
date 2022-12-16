import { useEffect, useState } from 'react';

export const useStaticTableHeight = (offset: number = 620) => {
  const [tableHeight, setTableHeight] = useState(window.innerHeight - offset);
  const handler = () => setTableHeight(window.innerHeight - offset)

  useEffect(() => {
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });

  return tableHeight;
};
