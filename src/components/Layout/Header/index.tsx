/* eslint-disable jsx-a11y/anchor-is-valid */
import { PageHeader, Dropdown, Menu, Button, Space } from 'antd';
import { MedicineBoxOutlined, HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import Gravatar from '@ferlab/ui/core/components/Gravatar';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import { STATIC_ROUTES } from 'utils/routes';
import intl from 'react-intl-universal';
import { useKeycloak } from '@react-keycloak/web';
import { IncludeKeycloakTokenParsed } from 'utils/tokenTypes';
import { useHistory } from 'react-router-dom';
import EnvironmentVariables from 'utils/EnvVariables';
import { useDispatch } from 'react-redux';
import { globalActions, useLang } from 'store/global';
import { LANG } from 'utils/constants';
import { getUserFirstName } from 'auth/keycloak';

import styles from './index.module.scss';
import LineStyleIcon from 'components/icons/LineStyleIcon';

const Header = () => {
  const { keycloak } = useKeycloak();
  const lang = useLang();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPathName = history.location.pathname;
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  const targetLang = lang === LANG.FR ? LANG.EN : LANG.FR;

  return (
    <PageHeader
      title={
        <img className={styles.logo} alt={'Clin Portal UI'} src="/assets/logos/cqgc-white.svg" />
      }
      subTitle={
        <nav className={styles.headerList}>
          <HeaderLink
            key="home"
            currentPathName={currentPathName}
            to={STATIC_ROUTES.HOME}
            icon={<HomeOutlined />}
            title={intl.get('layout.main.menu.home')}
          />
          <HeaderLink
            key="prescriptions"
            currentPathName={currentPathName}
            to={STATIC_ROUTES.PRESCRIPTION_SEARCH}
            icon={<MedicineBoxOutlined />}
            title={intl.get('layout.main.menu.prescriptions')}
          />
          <HeaderLink
            key="archives"
            currentPathName={currentPathName}
            to={STATIC_ROUTES.ARCHIVE_EXPLORATION}
            icon={<FileTextOutlined />}
            title={intl.get('layout.main.menu.archives')}
          />
          <HeaderLink
            key="variants"
            currentPathName={currentPathName}
            to={STATIC_ROUTES.VARIANT_EXPLORATION_RQDM}
            icon={<LineStyleIcon height="14" width="14" />}
            title={intl.get('layout.main.menu.variants')}
          />
        </nav>
      }
      extra={
        <Space className={styles.extras} size={12}>
          <Dropdown
            key="user-menu"
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key="logout" onClick={async () => await keycloak.logout()}>
                  {intl.get('logout')}
                </Menu.Item>
              </Menu>
            }
          >
            <a className={styles.userMenuTrigger} onClick={(e) => e.preventDefault()} href="">
              <Gravatar
                className={styles.userGravatar}
                circle
                email={tokenParsed.email || tokenParsed.identity_provider_identity}
              />
              <span className={styles.userName}>{getUserFirstName()}</span>
              <DownOutlined />
            </a>
          </Dropdown>
          {EnvironmentVariables.configFor('SHOW_TRANSLATION_BTN') === 'true' && (
            <Button
              size="small"
              className={styles.langBtn}
              type="text"
              onClick={() => dispatch(globalActions.changeLang(targetLang))}
            >
              {targetLang.toUpperCase()}
            </Button>
          )}
        </Space>
      }
      className={styles.mainHeader}
    />
  );
};

export default Header;
