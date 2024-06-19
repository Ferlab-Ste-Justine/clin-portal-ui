import { ReactElement } from 'react';
import { Row } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

interface OwnProps {
  sideImgSrc?: string;
  children: ReactElement;
  className?: string;
}

const SideImageLayout = ({ sideImgSrc, children, className = ' ' }: OwnProps) => (
  <div className={cx(styles.sideImagePageContainer, className)}>
    <Row className={styles.contentWrapper}>
      <div
        className={styles.sideImageContainer}
        style={{
          backgroundImage: `url(${sideImgSrc})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <Row className={styles.pageContent}>{children}</Row>
    </Row>
  </div>
);

export default SideImageLayout;
