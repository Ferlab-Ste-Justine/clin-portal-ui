import { PlusOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space, Typography } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

interface OwnProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ActionButton = ({ icon, title, description, onClick }: OwnProps) => (
  <GridCard
    theme="shade"
    wrapperClassName={styles.homeActionCardWrapper}
    className={styles.homeActionCard}
    contentClassName={styles.homeActionContent}
    onClick={onClick}
    data-cy="ActionButton"
    content={
      <Space className={styles.homeActionButton} size={0} direction="vertical">
        <span className={styles.homeActionIcon}>{icon}</span>
        <Space direction="vertical">
          <Typography.Title className={styles.text} level={3}>
            {title} <PlusOutlined className={styles.plusIcon} />
          </Typography.Title>
          <Typography.Text className={cx(styles.text, styles.description)}>
            {description}
          </Typography.Text>
        </Space>
      </Space>
    }
  />
);

export default ActionButton;
