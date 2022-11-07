/// <reference types="Cypress" />
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    login(): cy & CyEventEmitter;

    logout(): cy & CyEventEmitter;
  }
}
