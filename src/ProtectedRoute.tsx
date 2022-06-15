import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import Spinner from 'components/uiKit/Spinner';
import ConditionalWrapper from 'components/utils/ConditionalWrapper';

import LoginWrapper from './components/LoginWrapper';

type OwnProps = Omit<RouteProps, 'component' | 'render' | 'children'> & {
  layout?: (children: any) => React.ReactElement;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children, layout, ...routeProps }: OwnProps) => {
  const { keycloak, initialized } = useKeycloak();
  const RouteLayout = layout!;
  const keycloakIsReady = keycloak && initialized;
  const showLogin = keycloakIsReady && !keycloak.authenticated;

  if (!keycloakIsReady) {
    return <Spinner size={'large'} />;
  }

  if (showLogin) {
    return <LoginWrapper Component={<Spinner size={'large'} />} />;
  }

  return (
    <ConditionalWrapper
      condition={!!RouteLayout}
      wrapper={(children) => <RouteLayout>{children}</RouteLayout>}
    >
      <Route {...routeProps}>{children}</Route>
    </ConditionalWrapper>
  );
};

export default ProtectedRoute;
