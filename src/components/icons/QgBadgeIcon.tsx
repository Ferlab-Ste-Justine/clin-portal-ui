import React from 'react';

import { IconProps } from 'components/icons';

const QgBadgeIcon = ({ svgClass = '' }: IconProps) => {
  const width = 10;
  const height = 10;
  const x = 0;
  const y = 0;

  const points = `${x},${y} ${x + width / 2},${y + height} ${x - width / 2},${y + height}`;

  return (
    <svg
      className={svgClass}
      height={12}
      width={10}
      strokeWidth={1}
      viewBox={`${x - 1 - width / 2} ${y - 1} ${width + 2} ${height + 2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points={points} />
    </svg>
  );
};

export default QgBadgeIcon;
