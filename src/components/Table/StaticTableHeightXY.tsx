import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

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
    const elem = divRef.current;

    const handleTableDimensionChange = () => {
      const width = divRef?.current?.clientWidth;
      const height = divRef?.current?.clientHeight;
      const newHeight = height ? height - YOffset : 0;

      setTableDimension({
        x: width ? width + Xoffset : 0,
        y: newHeight ? newHeight : 0,
      });
    };

    const resize_ob = new ResizeObserver(
      debounce((entries) => {
        const rect = entries[0].contentRect;

        if (rect.height !== tableDimension.y + YOffset) {
          handleTableDimensionChange();
        }
      }, 40),
    );

    if (elem) {
      resize_ob.observe(elem);
    }

    if (
      elem &&
      (elem.clientWidth + Xoffset !== tableDimension.x ||
        elem.clientHeight - YOffset !== tableDimension.y)
    ) {
      handleTableDimensionChange();
    }

    return () => {
      if (elem) {
        resize_ob.unobserve(elem);
      }
    };
  }, [columnState, divRef, tableDimension]);

  return tableDimension;
};
