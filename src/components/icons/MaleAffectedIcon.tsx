/* eslint-disable max-len */
import React from 'react';
import cx from 'classnames';

import { IconProps } from '.';

const DiseaseIcon = ({ className = '', width = '16', height = '16' }: IconProps) => (
  <svg
    className={cx('anticon', className)}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M15.1666 14.6667H1.83325V1.33337H15.1666V14.6667Z" />
  </svg>
);
export default DiseaseIcon;
