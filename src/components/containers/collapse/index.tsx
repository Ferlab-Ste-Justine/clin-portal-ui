import React from 'react';
import Collapse, { CollapsePanel as FUICollapsePanel } from '@ferlab/ui/core/components/Collapse';
import { Spin } from 'antd';

import styles from './index.module.css';

type Props = {
  header: React.ReactNode | string;
  children: React.ReactNode;
  bordered?: boolean;
  loading?: boolean;
  datacy?: string;
};

const CollapsePanel = ({
  header,
  children,
  bordered = false,
  loading = false,
  datacy = '',
}: Props): React.ReactElement => (
  <div className={styles.collapsePanelWrapper} data-cy={`${datacy}_CollapsePanel`}>
    <Spin spinning={loading}>
      <Collapse bordered={bordered} headerBorderOnly defaultActiveKey="1" arrowIcon="caretFilled">
        <FUICollapsePanel header={header} key={`1`}>
          {children}
        </FUICollapsePanel>
      </Collapse>
    </Spin>
  </div>
);

export default CollapsePanel;
