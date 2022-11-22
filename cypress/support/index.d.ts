/// <reference types="Cypress" />
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    checkValueFacet(facetRank: number, value: string|RegExp): cy & CyEventEmitter;
    clickApplyFacet(): cy & CyEventEmitter;
    login(user: string, password: string): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    visitCNVsPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitPrescriptionEntityPage(prescriptionId: string): cy & CyEventEmitter;
    visitPrescriptionsPage(): cy & CyEventEmitter;
    visitVariantsPage(): cy & CyEventEmitter;
    visitVariantsPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
  }
}