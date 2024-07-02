import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import cx from 'classnames';

import ConditionalWrapper from 'components/utils/ConditionalWrapper';

import Container from '../Container';
import Footer from '../Footer';

import sharedStyles from '../shared.module.css';
import styles from './index.module.css';

interface OwnProps {
  scrollId?: string;
  children: React.ReactElement;
  className?: string;
  container?: boolean;
  dynamic?: boolean;
}

const ScrollContentWithFooter = ({
  children,
  scrollId,
  className = '',
  container = false,
  dynamic,
}: OwnProps) => (
  <ScrollContent id={scrollId} className={cx(styles.contentWithFooter, className)}>
    <div className={styles.mainWrapper}>
      <ConditionalWrapper
        condition={container}
        wrapper={(children) => (
          <div
            className={
              dynamic ? sharedStyles.dynamicContainerWrapper : sharedStyles.containerWrapper
            }
          >
            <Container className={sharedStyles.container}>{children}</Container>
          </div>
        )}
      >
        {children}
      </ConditionalWrapper>
      <Footer />
    </div>
  </ScrollContent>
);

export default ScrollContentWithFooter;
