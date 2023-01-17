import { useRef } from 'react';

import { ITableDimension, useStaticTableHeight } from 'components/Table/StaticTableHeightXY';

import styles from './index.module.scss';

interface OwnProps {
  numberOfColumn: any[];
  fixedProTable: (d: ITableDimension) => React.ReactElement;
}

const FixedSizeTable = ({ numberOfColumn, fixedProTable }: OwnProps) => {
  const thisRef = useRef<HTMLDivElement>(null);
  const dimension = useStaticTableHeight(thisRef, numberOfColumn || []);

  return (
    <div ref={thisRef} className={styles.fixedSizeTable}>
      {fixedProTable(dimension)}
    </div>
  );
};

export default FixedSizeTable;
