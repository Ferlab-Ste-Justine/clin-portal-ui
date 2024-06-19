import React from 'react';
import intl from 'react-intl-universal';
import { Result } from 'antd';

import styles from './index.module.css';

interface OwnProps {
  title?: string;
  description?: string;
}

const NotFound = ({ title, description }: OwnProps) => (
  <div className={styles.notFoundWrapper}>
    <Result
      status="404"
      className={styles.notFoundResult}
      title={title ? title : intl.get('result.notfound.error.title')}
      subTitle={description ? description : intl.get('result.notfound.error.description')}
    />
  </div>
);

export default NotFound;
