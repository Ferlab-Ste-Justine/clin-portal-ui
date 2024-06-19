import { useEffect, useRef, useState } from 'react';

import { ITableDimension } from 'components/Table/StaticTableHeightXY';
import useElementSize from 'hooks/useElementSize';
import useWindowSize from 'hooks/useWindowSize';

import styles from './index.module.css';

interface OwnProps {
  numberOfColumn: any[];
  fixedProTable: (d: ITableDimension) => React.ReactElement;
}

const FixedSizeTable = ({ fixedProTable }: OwnProps) => {
  const windowSize = useWindowSize();
  const [dimension, setDimension] = useState<ITableDimension>({ x: 0, y: 0 });
  const queryBuilderDimensions = useElementSize('query-builder-header-tools');
  const thisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = thisRef.current;
    if (node) {
      const { y: top } = node.getBoundingClientRect();

      const y = windowSize.height - (top + 225);

      setDimension({ x: 'max-content', y });
    }
  }, [windowSize, thisRef, queryBuilderDimensions]);
  return (
    <div ref={thisRef} className={styles.fixedSizeTable}>
      {fixedProTable(dimension)}
    </div>
  );
};

export default FixedSizeTable;
