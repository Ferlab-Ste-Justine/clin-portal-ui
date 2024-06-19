import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

interface OwnProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

const Sidebar = ({ children, isLoading = false }: OwnProps): React.ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Spin className={styles.loader} spinning={isLoading}>
      <div className={cx(styles.siderContainer, collapsed ? styles.collapsed : '')}>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
        <ScrollContent className={cx(styles.scrollWrapper, collapsed ? styles.collapsed : '')}>
          {children}
        </ScrollContent>
      </div>
    </Spin>
  );
};

export default Sidebar;
