import React from 'react';
import { Layout } from 'antd';

import Header from 'components/Layout/Header';

import styles from './index.module.scss';

interface OwnProps {
  children: React.ReactElement;
}

const FixedLayout = ({ children }: OwnProps) => (
  <Layout className={styles.fixedLayout}>
    <Header />
    {children}
  </Layout>
);

export default FixedLayout;
