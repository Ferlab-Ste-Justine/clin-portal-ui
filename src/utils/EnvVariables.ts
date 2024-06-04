export default class EnvironmentVariables {
  static vars: Record<string, string | undefined> = {
    // GENERAL
    ENV: process.env.NODE_ENV,
    SHOW_TRANSLATION_BTN: process.env.REACT_APP_SHOW_TRANSLATION_BTN,
    SHOW_ASSIGNMENT: process.env.REACT_APP_SHOW_ASSIGNMENT,
    KEYCLOAK_CONFIG: process.env.REACT_APP_KEYCLOAK_CONFIG,
    WEB_ROOT: process.env.REACT_APP_WEB_ROOT,
    // APIS
    ARRANGER_API: process.env.REACT_APP_ARRANGER_API,
    ARRANGER_PROJECT_ID: process.env.REACT_APP_ARRANGER_PROJECT_ID,
    FHIR_API: process.env.REACT_APP_FHIR_SERVICE_URL,
    USERS_API_URL: process.env.REACT_APP_USERS_API_URL,
    FORM_API_URL: process.env.REACT_APP_FORM_API_URL,
    PANELS_FILE: process.env.REACT_APP_PANELS_FILE,
    FORCE_FILTER_BOOLEAN_TO_DICTIONARY: process.env.REACT_APP_FORCE_FILTER_BOOLEAN_TO_DICTIONARY,
    FILTER_BOOLEAN_TO_DICTIONARY_EXCEPTIONS:
      process.env.REACT_APP_FILTER_BOOLEAN_TO_DICTIONARY_EXCEPTIONS,

    // Google Analytics
    MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
  };

  static configFor(key: string): string {
    return EnvironmentVariables.vars[key] || '';
  }
}

export const getEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_${key}`] as any) || defaultValue;

export const getFTEnvVarByKey = <T>(key: string, defaultValue?: T): T =>
  (process.env[`REACT_APP_FT_${key}`] as any) || defaultValue;
