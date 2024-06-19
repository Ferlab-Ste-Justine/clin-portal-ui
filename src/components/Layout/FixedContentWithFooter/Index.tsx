import cx from 'classnames';

import ConditionalWrapper from 'components/utils/ConditionalWrapper';

import Container from '../Container';
import Footer from '../Footer';

import sharedStyles from '../shared.module.css';
import styles from './index.module.css';

interface OwnProps {
  children: React.ReactElement;
  className?: string;
  container?: boolean;
}

const FixedContentWithFooter = ({ children, className = '', container = false }: OwnProps) => (
  <div className={cx(styles.contentWithFooter, className)}>
    <ConditionalWrapper
      condition={container}
      wrapper={(children) => (
        <div className={sharedStyles.containerWrapper}>
          <Container className={sharedStyles.container}>{children}</Container>
        </div>
      )}
    >
      {children}
    </ConditionalWrapper>
    <Footer />
  </div>
);

export default FixedContentWithFooter;
