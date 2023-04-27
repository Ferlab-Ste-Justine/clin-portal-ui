import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import cx from 'classnames';

import { useLang } from 'store/global';

import styles from './index.module.scss';

interface OwnProps {
  title: string;
  className?: string;
  tooltipText?: string;
}

const SearchLabel = ({ title, tooltipText, className = '' }: OwnProps) => {
  useLang();
  return (
    <span className={cx(styles.searchLabel, styles.titleWrapper, className)}>
      <Typography.Text strong className={styles.title}>
        {intl.get(title)}
      </Typography.Text>
      {tooltipText && (
        <Tooltip
          align={{ offset: [-24, 0] }}
          arrowPointAtCenter
          placement="topLeft"
          title={tooltipText ? intl.get(tooltipText) : ''}
        >
          <InfoCircleOutlined className={styles.tooltipIcon} />
        </Tooltip>
      )}
    </span>
  );
};

export default SearchLabel;
