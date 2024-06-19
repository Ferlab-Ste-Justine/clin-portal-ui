import React from 'react';
import { Button, Tooltip } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

type TOnClick = () => void;

interface OwnProps {
  className?: string;
  title: string;
  tooltip: string;
  onClick: TOnClick;
  loading?: boolean;
  icon?: React.ReactElement;
}

const doOnClick = (e: React.MouseEvent, onClick: TOnClick) => {
  e.preventDefault();
  onClick();
};

const HeaderButton = ({
  className = '',
  icon,
  title,
  tooltip,
  onClick,
  loading = false,
}: OwnProps) => (
  <Tooltip title={tooltip}>
    <Button
      loading={loading}
      className={cx(className, styles.headerBtn)}
      icon={icon}
      onClick={(e) => doOnClick(e, onClick)}
      onMouseDown={(e) => e.preventDefault()} // remove focus after click
    >
      {title}
    </Button>
  </Tooltip>
);

export default HeaderButton;
