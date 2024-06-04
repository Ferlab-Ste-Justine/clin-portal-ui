import ReactGA from 'react-ga4';

import EnvironmentVariables from 'utils/EnvVariables';

const measurementId = EnvironmentVariables.configFor('MEASUREMENT_ID');
const isDev = EnvironmentVariables.configFor('ENV') === 'development';
const isGaActive = measurementId && !isDev;

export const initGa = () => {
  if (isGaActive) {
    ReactGA.initialize(measurementId);
  }
};

export const trackAuthSuccess = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Authentication',
      action: 'Login Success',
    });
  }
};

export const trackAuthError = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Authentication',
      action: 'Login Failed',
    });
  }
};

export const trackLogout = () => {
  if (isGaActive) {
    ReactGA.event({
      category: 'Authentication',
      action: 'Logout',
    });
  }
};
