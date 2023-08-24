/// <reference types="Cypress" />
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable {
    checkAndClickApplyFacet(section: string, facetTitle: string|RegExp, facetRank: number, value: string|RegExp, isRqdmActive: boolean = false): cy & CyEventEmitter;
    checkValueFacet(facetRank: number, value: string|RegExp): cy & CyEventEmitter;
    clickAndIntercept(selector: string, methodHTTP: string, routeMatcher: string, nbCalls: number, eq?: number): cy & CyEventEmitter;
    clickApplyFacet(nbCalls: number): cy & CyEventEmitter;
    closePopup(): cy & CyEventEmitter;
    login(user: string, password: string): cy & CyEventEmitter;
    logout(): cy & CyEventEmitter;
    removeFilesFromFolder(folder: string): cy & CyEventEmitter;
    resetColumns(eq: number): cy & CyEventEmitter;
    showColumn(column: string, eq: number): cy & CyEventEmitter;
    sortTableAndIntercept(column: string, nbCalls: number, eq: number = 0): cy & CyEventEmitter;
    sortTableAndWait(column: string, eq: number = 0): cy & CyEventEmitter;
    typeAndIntercept(selector: string, text: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    validateClearAllButton(shouldExist: boolean): cy & CyEventEmitter;
    validateDictionnary(section: string, facetTitle: RegExp, facetRank: number, dictionnary: (string|RegExp)[]): cy & CyEventEmitter;
    validateFacetFilter(section: string, facetTitle: string|RegExp, facetRank: number, value: string|RegExp, expectedCount: string|RegExp, isRqdmActive: boolean = false): cy & CyEventEmitter;
    validateFileContent(fixture: string, replacements?: Replacement[]): cy & CyEventEmitter;
    validateFileHeaders(fixture: string): cy & CyEventEmitter;
    validateFileName(namePattern: string): cy & CyEventEmitter;
    validateOperatorSelectedQuery(expectedOperator: string): cy & CyEventEmitter;
    validatePillSelectedQuery(facetTitle: string|RegExp, values: (string|RegExp)[], eq: number = 0): cy & CyEventEmitter;
    validatePaging(total: string, eq: number): cy & CyEventEmitter;
    validateTableDataRowKeyAttr(dataRowKey: string, eq: number, expectedAttr: string, expectedValue: string): cy & CyEventEmitter;
    validateTableDataRowKeyClass(dataRowKey: string, eq: number, expectedClass: string): cy & CyEventEmitter;
    validateTableDataRowKeyContent(dataRowKey: string, eq: number, expectedContent: string|RegExp): cy & CyEventEmitter;
    validateTableFirstRow(expectedValue: string|RegExp, eq: number, selector: string = ''): cy & CyEventEmitter;
    validateTableResultsCount(expectedCount: string|RegExp, shouldExist: boolean = true): cy & CyEventEmitter;
    validateTotalSelectedQuery(expectedCount: string|RegExp): cy & CyEventEmitter;
    visitAndIntercept(url: string, methodHTTP: string, routeMatcher: string, nbCalls: number): cy & CyEventEmitter;
    visitArchivesPatientPage(patientId: string): cy & CyEventEmitter;
    visitBioinformaticsAnalysisPage(bioAnalysisId: string): cy & CyEventEmitter;
    visitCNVsPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitFilesPatientPage(prescriptionId: string): cy & CyEventEmitter;
    visitPrescriptionEntityPage(prescriptionId: string): cy & CyEventEmitter;
    visitPrescriptionsPage(): cy & CyEventEmitter;
    visitVariantEntityPage(locusId: string, nbGraphqlCalls: number): cy & CyEventEmitter;
    visitVariantsPage(sharedFilterOption?: string): cy & CyEventEmitter;
    visitVariantsPatientPage(patientId: string, prescriptionId: string, nbGraphqlCalls: number, sharedFilterOption?: string): cy & CyEventEmitter;
    waitWhileSpin(ms: number): cy & CyEventEmitter;

    loginByGoogleApi(): cy & CyEventEmitter;
  }
}