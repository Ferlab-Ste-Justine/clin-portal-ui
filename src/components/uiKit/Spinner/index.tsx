import React from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

import style from 'components/uiKit/Spinner/index.module.css';

type SpinnerProps = SpinProps & {
  className?: string;
  children?: React.ReactNode;
};

const defaultClassName = style.spinner;

const Spinner = ({ className = defaultClassName, size, children }: SpinnerProps) => (
  <div className={className}>
    <Spin size={size}>{children}</Spin>
  </div>
);

export default Spinner;
