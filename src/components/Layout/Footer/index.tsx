import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Col, Layout, Row } from 'antd';
import get from 'lodash/get';

import { LimitTo, Roles } from 'components/Roles/Rules';

import styles from './index.module.css';

const ZEPLIN_URL = get(window, 'CLIN.zeplinUrl', process.env.REACT_APP_ZEPLIN_URL);
const FHIR_CONSOLE_URL = get(window, 'CLIN.fhirConsoleUrl', process.env.REACT_APP_FHIR_CONSOLE_URL);

const Footer = () => (
  <Layout.Footer id="footer" className={styles.footer}>
    <Row align="middle" justify="space-between">
      <Col>
        <LimitTo roles={[Roles.Links]}>
          <nav>
            <ul>
              <li>
                <ExternalLink href={ZEPLIN_URL} data-cy="ZeppelinLink">
                  {intl.get('footer.navigation.zepplin')}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={FHIR_CONSOLE_URL} data-cy="FhirLink">
                  {intl.get('footer.navigation.fhir')}
                </ExternalLink>
              </li>
            </ul>
          </nav>
        </LimitTo>
      </Col>
      <Col>
        <img alt="Saint-Justine" className="logo" src="/assets/logos/chujs-color.svg" />
      </Col>
    </Row>
  </Layout.Footer>
);

export default Footer;
