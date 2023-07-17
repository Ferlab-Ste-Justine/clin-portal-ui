import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Space } from 'antd';
import Title from 'antd/lib/typography/Title';

import MainSideImage from 'components/assets/side-img-svg.svg';
import CardiologyInstituteLogo from 'components/icons/CardiologyInstituteLogo';
import CHUMLogo from 'components/icons/CHUMLogo';
import CHUQuebecLogo from 'components/icons/CHUQuebecLogo';
import CHUSJLogo from 'components/icons/CHUSJLogo';
import CHUSLogo from 'components/icons/CHUSLogo';
import CQGCLogo from 'components/icons/CQGCLogo';
import HMRLogo from 'components/icons/HMRLogo';
import JewishHospitalLogo from 'components/icons/JewishHospitalLogo';
import McGillLogo from 'components/icons/McGillLogo';
import SSSLogo from 'components/icons/SSSLogo';
import SideImageLayout from 'components/Layout/SideImageLayout';
import Divider from 'components/uiKit/Divider';
import useQueryParams from 'hooks/useQueryParams';
import { globalActions, useLang } from 'store/global';
import { LANG, REDIRECT_URI_KEY } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

const Landing = (): React.ReactElement => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();
  const dispatch = useDispatch();
  const lang = useLang();
  const targetLang = lang === LANG.FR ? LANG.EN : LANG.FR;

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.HOME}`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <SideImageLayout sideImgSrc={MainSideImage} className={styles.landingPage}>
      <div>
        <div className={styles.landingCard}>
          <div className={styles.switchLang}>
            {EnvironmentVariables.configFor('SHOW_TRANSLATION_BTN') === 'true' && (
              <Button
                className={styles.langBtn}
                type={'primary'}
                onClick={() => dispatch(globalActions.changeLang(targetLang))}
              >
                {targetLang.toUpperCase()}
              </Button>
            )}
          </div>
          <div className={styles.logoContainer}>
            <CQGCLogo />
            <Divider />
            <Title level={3} className={styles.landingTitle}>
              {intl.get('screen.landing.title')}
            </Title>
          </div>
          <div className={styles.landingDescription}>
            <span>{intl.get('screen.landing.description')}</span>
          </div>
          <Space size={16}>
            <Button type={'primary'} onClick={handleSignin} size={'large'}>
              {intl.get('login')}
            </Button>
          </Space>
        </div>
        <div className={styles.logoGrid}>
          <div className={styles.logoRow}>
            <CHUSJLogo /> <CHUMLogo /> <JewishHospitalLogo /> <CHUQuebecLogo />
          </div>
          <div className={styles.logoRow}>
            <CardiologyInstituteLogo /> <CHUSLogo /> <HMRLogo /> <McGillLogo />
          </div>
          <div className={styles.sssLogoContainer}>
            <SSSLogo />
          </div>
        </div>
      </div>
    </SideImageLayout>
  );
};
export default Landing;
