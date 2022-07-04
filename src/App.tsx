import { useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteChildrenProps,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import loadable from '@loadable/component';
import { useKeycloak } from '@react-keycloak/web';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import frFR from 'antd/lib/locale/fr_FR';
import ProtectedRoute from 'ProtectedRoute';
import ContextProvider from 'providers/ContextProvider';
import ErrorPage from 'views/Error';

import ErrorBoundary from 'components/ErrorBoundary';
import PageLayout from 'components/Layout';
import Spinner from 'components/uiKit/Spinner';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';
import { useLang } from 'store/global';
import { fetchFhirServiceRequestCodes } from 'store/global/thunks';
import { fetchConfig, fetchPractitionerRole } from 'store/user/thunks';
import { LANG } from 'utils/constants';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';

const loadableProps = { fallback: <Spinner size="large" /> };
const BioInfoAnalysis = loadable(() => import('views/BioInfoAnalysis'), loadableProps);
const PrescriptionEntity = loadable(() => import('views/Prescriptions/Entity'), loadableProps);
const PrescriptionSearch = loadable(() => import('views/Prescriptions/Search'), loadableProps);
const VariantEntity = loadable(() => import('views/Variants/Entity'), loadableProps);
const VariantExplorationPatient = loadable(
  () => import('views/Variants/Exploration/Patient'),
  loadableProps,
);
const VariantExplorationRqdm = loadable(
  () => import('views/Variants/Exploration/Rqdm'),
  loadableProps,
);
const HomePage = loadable(() => import('views/Home'), loadableProps);
const Archives = loadable(() => import('views/Archives'), loadableProps);

const App = () => {
  const lang = useLang();
  const dispatch = useDispatch();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;

  useEffect(() => {
    if (keycloakIsReady && keycloak.authenticated) {
      dispatch(fetchPractitionerRole());
      dispatch(fetchFhirServiceRequestCodes());
      dispatch(fetchConfig());
    }
    // eslint-disable-next-line
  }, [keycloakIsReady, keycloak]);

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFR : enUS}
      renderEmpty={() => <Empty imageType="grid" description={intl.get('no.data.available')} />}
    >
      <div className="App" id="appContainer">
        {keycloakIsReady ? (
          <Router>
            <Switch>
              <ProtectedRoute exact path={STATIC_ROUTES.HOME} layout={PageLayout}>
                <HomePage />
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.PRESCRIPTION_SEARCH} layout={PageLayout}>
                <PrescriptionSearch />
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.PRESCRIPTION_ENTITY} layout={PageLayout}>
                {(
                  props: RouteChildrenProps<{
                    id: string;
                  }>,
                ) => <PrescriptionEntity prescriptionId={props.match?.params.id!} />}
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.BIOINFO_ANALYSIS} layout={PageLayout}>
                {(
                  props: RouteChildrenProps<{
                    id: string;
                  }>,
                ) => <BioInfoAnalysis id={props.match?.params.id!} />}
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={DYNAMIC_ROUTES.VARIANT_EXPLORATION_PATIENT}
                layout={PageLayout}
              >
                <VariantExplorationPatient />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path={STATIC_ROUTES.VARIANT_EXPLORATION_RQDM}
                layout={PageLayout}
              >
                <VariantExplorationRqdm />
              </ProtectedRoute>
              <ProtectedRoute exact path={DYNAMIC_ROUTES.VARIANT_ENTITY} layout={PageLayout}>
                <VariantEntity />
              </ProtectedRoute>
              <ProtectedRoute exact path={STATIC_ROUTES.ARCHIVE_EXPLORATION} layout={PageLayout}>
                <Archives />
              </ProtectedRoute>
              <Route
                path={DYNAMIC_ROUTES.ERROR}
                render={(props: RouteComponentProps<{ status?: any }>) => (
                  <ErrorPage status={props.match.params.status} />
                )}
              />
              <Redirect from="*" to={STATIC_ROUTES.HOME} />
            </Switch>
            <NotificationContextHolder />
          </Router>
        ) : (
          <Spinner size={'large'} />
        )}
      </div>
    </ConfigProvider>
  );
};

const EnhanceApp = () => (
  <ErrorBoundary>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ErrorBoundary>
);

export default EnhanceApp;
