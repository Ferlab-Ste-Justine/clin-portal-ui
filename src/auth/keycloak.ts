import Keycloak from 'keycloak-js';

import { keycloakConfig } from 'utils/config';

const keycloak = new Keycloak(keycloakConfig);

export const getFhirPractitionerId = () =>
  keycloak.tokenParsed ? keycloak.tokenParsed.fhir_practitioner_id : undefined;

export const getUserFirstName = () => keycloak?.tokenParsed?.given_name || '';

export const getUserLastName = () => keycloak?.tokenParsed?.family_name || '';

export const getUserFullName = () => `${getUserFirstName()} ${getUserLastName()}`;

export default keycloak;

export const logout = () => keycloak.logout();
