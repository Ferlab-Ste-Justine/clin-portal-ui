import { Skeleton, SkeletonProps } from 'antd';
import { SkeletonParagraphProps } from 'antd/lib/skeleton/Paragraph';
import cx from 'classnames';

import styles from './index.module.css';

type OwnProps = Omit<SkeletonProps, 'title' | 'paragraph'> & {
  paragraph?: SkeletonParagraphProps;
};

const ParagraphLoader = (props: OwnProps) => (
  <Skeleton
    {...props}
    className={cx(styles.paragraphLoader, props.className)}
    title={false}
    paragraph={
      props.paragraph || {
        rows: 4,
      }
    }
    active
  />
);

export default ParagraphLoader;
