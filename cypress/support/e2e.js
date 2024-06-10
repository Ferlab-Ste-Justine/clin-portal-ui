/* eslint-disable */
/// <reference types="Cypress" />
import './commands';
import {getGlobalData} from './globalData';

let token;
let globalData = getGlobalData();

Cypress.Commands.add('fetchFhirValues', () => {
  const username = Cypress.env('username_DG_CHUSJ_CUSM_CHUS');
  const password = Cypress.env('password');

  return cy.request({
    method: 'GET',
    url: `https://qlin-me.qa.cqgc.hsj.rtss.qc.ca/api/v1/auth/login?email=${username}&password=${password}`,
    failOnStatusCode: false,
  }).then((response) => {
    token = response.body.token;
    expect(token).to.exist;
  return cy.request({
    method: 'POST',
    url: 'https://fhir.qa.cqgc.hsj.rtss.qc.ca/fhir',
    headers: { 'Authorization': `Bearer ${token}` },
    body: {
      "entry": [
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.mrnProb}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.mrnMth}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.mrnFth}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_EP_CUSM_LDM_CHUSJ.mrnProb}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_EP_CUSM_LDM_CUSM.mrnProb}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_EP_CHUS_LDM_CHUS.mrnProb}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_SOMATIC.mrnProb}`
          }
        },
        {
          "request": {
          "method": "GET",
          "url": `/Patient?identifier=${globalData.presc_PAIRED.mrnProb}`
          }
        }
      ],
      "id": "bundle-request-patient-data",
      "resourceType": "Bundle",
      "type": "batch"
    },
    failOnStatusCode: false,
  });
  }).then((response) => {
    let fhirValues = response.body;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientProbId = fhirValues.entry[0].resource.entry[0].resource.id;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.stampDate = fhirValues.entry[0].resource.entry[0].resource.meta.lastUpdated.split('T')[0];
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientMthId = fhirValues.entry[1].resource.entry[0].resource.id;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientFthId = fhirValues.entry[2].resource.entry[0].resource.id;
    globalData.presc_EP_CUSM_LDM_CHUSJ.patientProbId = fhirValues.entry[3].resource.entry[0].resource.id;
    globalData.presc_EP_CUSM_LDM_CUSM.patientProbId = fhirValues.entry[4].resource.entry[0].resource.id;
    globalData.presc_EP_CHUS_LDM_CHUS.patientProbId = fhirValues.entry[5].resource.entry[0].resource.id;
    globalData.presc_SOMATIC.patientProbId = fhirValues.entry[6].resource.entry[0].resource.id;
    globalData.presc_PAIRED.patientProbId = fhirValues.entry[7].resource.entry[0].resource.id;

    return cy.request({
      method: 'POST',
      url: 'https://fhir.qa.cqgc.hsj.rtss.qc.ca/fhir',
      headers: { 'Authorization': `Bearer ${token}` },
      body: {
        "entry": [
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientProbId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientMthId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientFthId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/Task?patient=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientProbId}`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/Task?patient=${globalData.presc_EP_CHUSJ_LDM_CHUSJ.patientFthId}`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_EP_CUSM_LDM_CHUSJ.patientProbId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_EP_CUSM_LDM_CUSM.patientProbId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_EP_CHUS_LDM_CHUS.patientProbId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_SOMATIC.patientProbId}&code=65241`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/Task?patient=${globalData.presc_SOMATIC.patientProbId}`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_PAIRED.patientProbId}&code=75020`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/ServiceRequest?patient=${globalData.presc_PAIRED.patientProbId}&code=65241`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/Task?patient=${globalData.presc_PAIRED.patientProbId}&code=GEBA`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/Task?patient=${globalData.presc_PAIRED.patientProbId}&code=TEBA`
            }
          },
          {
            "request": {
            "method": "GET",
            "url": `/Task?patient=${globalData.presc_PAIRED.patientProbId}&code=TNEBA`
            }
          }
        ],
        "id": "bundle-request-patient-data",
        "resourceType": "Bundle",
        "type": "batch"
      },
      failOnStatusCode: false,
    });
  }).then((response) => {
    let fhirValues = response.body;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.prescriptionId = fhirValues.entry[0].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.requestProbId = fhirValues.entry[0].resource.entry[0].resource.id;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.requestMthId = fhirValues.entry[1].resource.entry[0].resource.id;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.requestFthId = fhirValues.entry[2].resource.entry[0].resource.id;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.bioAnalProbId = fhirValues.entry[3].resource.entry[0].resource.id;
    globalData.presc_EP_CHUSJ_LDM_CHUSJ.bioAnalFthId = fhirValues.entry[4].resource.entry[0].resource.id;
    globalData.presc_EP_CUSM_LDM_CHUSJ.prescriptionId = fhirValues.entry[5].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_EP_CUSM_LDM_CUSM.prescriptionId = fhirValues.entry[6].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_EP_CHUS_LDM_CHUS.prescriptionId = fhirValues.entry[7].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_SOMATIC.prescriptionId = fhirValues.entry[8].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_SOMATIC.requestProbId = fhirValues.entry[8].resource.entry[0].resource.id;
    globalData.presc_SOMATIC.bioAnalProbId = fhirValues.entry[9].resource.entry[0].resource.id;
    globalData.presc_PAIRED.prescriptionId.GEBA = fhirValues.entry[10].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_PAIRED.requestProbId.GEBA = fhirValues.entry[10].resource.entry[0].resource.id;
    globalData.presc_PAIRED.prescriptionId.TEBA = fhirValues.entry[11].resource.entry[0].resource.basedOn[0].reference.split('/')[1];
    globalData.presc_PAIRED.requestProbId.TEBA = fhirValues.entry[11].resource.entry[0].resource.id;
    globalData.presc_PAIRED.bioAnalProbId.GEBA = fhirValues.entry[12].resource.entry[0].resource.id;
    globalData.presc_PAIRED.stampDate.GEBA = fhirValues.entry[12].resource.entry[0].resource.meta.lastUpdated.split('T')[0];
    globalData.presc_PAIRED.bioAnalProbId.TEBA = fhirValues.entry[13].resource.entry[0].resource.id;
    globalData.presc_PAIRED.stampDate.TEBA = fhirValues.entry[13].resource.entry[0].resource.meta.lastUpdated.split('T')[0];
    globalData.presc_PAIRED.bioAnalProbId.TNEBA = fhirValues.entry[14].resource.entry[0].resource.id;

    Cypress.env('globalData', globalData);
  });
});

// Ignore uncaught exception so tests doesn't stop mid run
Cypress.on('uncaught:exception', () => false);

before(() => {
  cy.exec('npm cache clear --force');
  cy.fetchFhirValues();
  cy.wait(1000);
});

after(() => {
  cy.exec('npm cache clear --force');
  cy.wait(1000);
});
