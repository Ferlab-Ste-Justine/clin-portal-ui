import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import Forbidden from 'components/Results/Forbidden';
import { Roles, validate } from 'components/Roles/Rules';
import Spinner from 'components/uiKit/Spinner';
import ConditionalWrapper from 'components/utils/ConditionalWrapper';
import { useRpt } from 'hooks/useRpt';
import { REDIRECT_URI_KEY } from 'utils/constants';
import { STATIC_ROUTES } from 'utils/routes';

type OwnProps = Omit<RouteProps, 'component' | 'render' | 'children'> & {
  layout?: (children: any) => React.ReactElement;
  roles?: Roles[];
  children: React.ReactNode;
};

const ProtectedRoute = ({ roles, children, layout, ...routeProps }: OwnProps) => {
  const { keycloak, initialized } = useKeycloak();
  const RouteLayout = layout!;
  const keycloakIsReady = keycloak && initialized;
  const showLogin = keycloakIsReady && !keycloak.authenticated;

  if (!keycloakIsReady) {
    return <Spinner size={'large'} />;
  }

  if (showLogin) {
    return (
      <Redirect
        to={{
          pathname: STATIC_ROUTES.LANDING,
          search: `${REDIRECT_URI_KEY}=${routeProps.location?.pathname}${routeProps.location?.search}`,
        }}
      />
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { decodedRpt } = useRpt();

  if (roles && decodedRpt && !validate(roles, decodedRpt, false)) {
    children = <Forbidden />;
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
