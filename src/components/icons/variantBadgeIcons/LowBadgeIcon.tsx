import React from 'react';

import { IconProps } from 'components/icons';

const LowBadgeIcon = ({ svgClass = '' }: IconProps) => (
  <svg
    className={svgClass}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 9.00012L0 1.00012H10L5 9.00012Z" />
  </svg>
);

export default LowBadgeIcon;
