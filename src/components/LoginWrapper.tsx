import React, { useEffect } from 'react';
import keycloak from 'auth/keycloak';

type OwnProps = {
  Component: React.ReactElement;
};

const LoginWrapper = ({ Component }: OwnProps) => {
  useEffect(() => {
    (async () => {
      await keycloak.login();
    })();
  });
  return Component;
};

export default LoginWrapper;
