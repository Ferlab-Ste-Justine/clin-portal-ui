import { useEffect, useState } from 'react';

export interface ITableDimension {
  x: number;
  y: number;
}

const YOffset = 124;
const Xoffset = 200;

export const useStaticTableHeight = (
  divRef: React.RefObject<HTMLDivElement>,
  columnState: any[],
): ITableDimension => {
  const [tableDimension, setTableDimension] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleTableDimensionChange = () => {
      const width = divRef?.current?.clientWidth;
      const height = divRef?.current?.clientHeight;
      const newHeight = height ? height - YOffset : 0;

      setTableDimension({
        x: width ? width + Xoffset : 0,
        y: newHeight ? newHeight : 0,
      });
    };

    window.addEventListener('resize', handleTableDimensionChange);

    if (
      divRef.current &&
      (divRef.current.clientWidth + Xoffset !== tableDimension.x ||
        divRef.current.clientHeight - YOffset !== tableDimension.y)
    ) {
      handleTableDimensionChange();
    }

    return () => window.removeEventListener('resize', handleTableDimensionChange);
  }, [columnState, divRef, tableDimension]);

  return tableDimension;
};
