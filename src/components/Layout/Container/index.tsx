import cx from 'classnames';

import styles from './index.module.css';

const Container: React.FC<{ children: React.ReactNode; className?: string }> = (props) => (
  <div className={cx(styles.container, props.className)}>{props.children}</div>
);

export default Container;
