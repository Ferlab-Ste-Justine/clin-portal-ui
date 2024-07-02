// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import intl from 'react-intl-universal';
import locales from 'locales';

intl.init({ locales, currentLocale: 'fr' });
process.env.REACT_APP_KEYCLOAK_CONFIG = '{}';

let mockIsAuthenticated = false;

jest.mock('@react-keycloak/web', () => {
  const originalModule = jest.requireActual('@react-keycloak/web');
  return {
    ...originalModule,
    useKeycloak: () => ({
      initialized: true,
      keycloak: {
        authenticated: mockIsAuthenticated,
      },
    }),
  };
});
