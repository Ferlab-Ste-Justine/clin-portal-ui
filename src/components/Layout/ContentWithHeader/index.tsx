import { Space } from 'antd';
import cx from 'classnames';

import ContentHeader, { ContentHeaderProps } from './Header';

import styles from './index.module.scss';

interface OwnProps {
  children: React.ReactNode;
  className?: string;
  headerProps: ContentHeaderProps;
}

const ContentWithHeader = ({
  children,
  headerProps,
  className = '',
}: OwnProps): React.ReactElement => (
  <Space className={cx(styles.contentWithHeader, className)} direction="vertical" size={0}>
    <ContentHeader {...headerProps} />
    <div className={styles.pageWrapper}>{children}</div>
  </Space>
);

export default ContentWithHeader;
