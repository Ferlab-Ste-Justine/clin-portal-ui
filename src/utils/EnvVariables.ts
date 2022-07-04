export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL
    ENV: process.env.NODE_ENV,
    SHOW_TRANSLATION_BTN: process.env.REACT_APP_SHOW_TRANSLATION_BTN,
    KEYCLOAK_CONFIG: process.env.REACT_APP_KEYCLOAK_CONFIG,
    WEB_ROOT: process.env.REACT_APP_WEB_ROOT,
    // APIS
    ARRANGER_API: process.env.REACT_APP_ARRANGER_API,
    ARRANGER_PROJECT_ID: process.env.REACT_APP_ARRANGER_PROJECT_ID,
    FHIR_API: process.env.REACT_APP_FHIR_SERVICE_URL,
    HPO_URL: process.env.REACT_APP_HPO_URL,
    USERS_API_URL: process.env.REACT_APP_USERS_API_URL,
  };

  static configFor(key: string): string {
    return EnvironmentVariables.vars[key] || '';
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_${key}`] as any) || defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_FT_${key}`] as any) || defaultValue;
