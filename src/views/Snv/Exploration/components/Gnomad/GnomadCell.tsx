import React from 'react';
import cx from 'classnames';

import styles from './GnomadCell.module.css';

interface OwnProps {
  underOnePercent: boolean;
}

const GnomadCell = ({ underOnePercent }: OwnProps) => (
  <div
    className={cx(
      underOnePercent ? styles.gnomadIndicatorRed : styles.gnomadIndicatorDefault,
      styles.gnomadIndicator,
    )}
  />
);

export default GnomadCell;
