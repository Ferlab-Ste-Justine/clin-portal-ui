import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  DownloadOutlined,
  FileTextOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import UserAvatar from '@ferlab/ui/core/components/UserAvatar';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, Menu, PageHeader, Space } from 'antd';
import { PanelsApi } from 'api/panels';
import { getUserFirstName } from 'auth/keycloak';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import HeaderButton from 'components/Layout/Header/HeaderButton';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import { LimitTo, Roles } from 'components/Roles/Rules';
import { globalActions, useLang } from 'store/global';
import { LANG, MIME_TYPES } from 'utils/constants';
import EnvironmentVariables from 'utils/EnvVariables';
import { downloadFile } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { IncludeKeycloakTokenParsed } from 'utils/tokenTypes';

import styles from './index.module.scss';

const Header = () => {
  const { keycloak } = useKeycloak();
  const [downloadPanelsFile, setDownloadPanelsFile] = useState({ fetching: false });
  const lang = useLang();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPathName = history.location.pathname;
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  const targetLang = lang === LANG.FR ? LANG.EN : LANG.FR;

  const handlePanelsFileDownload = () => {
    if (!downloadPanelsFile.fetching) {
      PanelsApi.fetchPanelsFile()
        .then(({ data, error }) => {
          if (error) {
            dispatch(
              globalActions.displayNotification({
                type: 'error',
                message: intl.get('panels.notification.error.title'),
                description: intl.get('panels.notification.error.description'),
              }),
            );
          } else {
            const blob = new Blob([data as BlobPart], { type: MIME_TYPES.APPLICATION_XLSX });
            downloadFile(blob, 'panels.xlsx');
          }
        })
        .finally(() => setDownloadPanelsFile({ ...downloadPanelsFile, fetching: false }));
      setDownloadPanelsFile({ ...downloadPanelsFile, fetching: true });
    }
  };

  return (
    <PageHeader
      title={
        <span>
          <img className={styles.logo} alt={'Clin Portal UI'} src="/assets/logos/cqgc-white.svg" />
          {EnvironmentVariables.configFor('SHOW_BETA_LABEL') === 'true' && (
            <span className={styles.betaLabel}>{intl.get('layout.main.menu.beta')}</span>
          )}
        </span>
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
          <LimitTo key="prescriptions" roles={[Roles.Practitioner]}>
            <HeaderLink
              key="prescriptions"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.PRESCRIPTION_SEARCH}
              icon={<MedicineBoxOutlined />}
              title={intl.get('layout.main.menu.prescriptions')}
              data-cy="HeaderLinkPrescriptions"
            />
          </LimitTo>
          <LimitTo key="archives" roles={[Roles.Download]}>
            <HeaderLink
              key="archives"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.ARCHIVE_EXPLORATION}
              icon={<FileTextOutlined />}
              title={intl.get('layout.main.menu.archives')}
              data-cy="HeaderLinkArchives"
            />
          </LimitTo>
          <LimitTo key="variants" roles={[Roles.Variants]}>
            <HeaderLink
              key="variants"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.SNV_EXPLORATION_RQDM}
              icon={<LineStyleIcon height="14" width="14" />}
              title={intl.get('layout.main.menu.variants')}
              data-cy="HeaderLinkVariants"
            />
          </LimitTo>
        </nav>
      }
      extra={
        <Space className={styles.extras} size={12}>
          <HeaderButton
            key="panels"
            icon={<DownloadOutlined />}
            title={intl.get('layout.main.menu.panels')}
            tooltip={intl.get('layout.main.menu.panels.tooltip')}
            onClick={() => handlePanelsFileDownload()}
            loading={downloadPanelsFile.fetching}
          />
          <Dropdown
            key="user-menu"
            trigger={['click']}
            overlay={
              <Menu
                onClick={async ({ key }) => (key === 'logout' ? await keycloak.logout() : null)}
                items={[{ label: intl.get('logout'), key: 'logout' }]}
              />
            }
          >
            <a className={styles.userMenuTrigger} onClick={(e) => e.preventDefault()} href="">
              <UserAvatar className={styles.userAvatar} userName={tokenParsed.name} size={24} />
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
