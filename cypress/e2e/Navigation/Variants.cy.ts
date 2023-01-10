/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

describe('Affichage de tous les variants [!! Très long à exécuter !!]', () => {
  beforeEach(() => {
    cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  });

  afterEach(() => {
    cy.logout();
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it.skip('Par page de 100 [CLIN-904 (~5 minutes)]', () => {
    cy.visitVariantsPage();
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('100').click({force: true});

    let stop = false
    const timeout = 13000
    for(let i = 1; i<timeout && !stop;i++){
      cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="0"]').find('td[class*="ant-table-cell-fix-left-last"]').invoke('text').then((text1) => {  
        cy.log('Itération #'+i.toString());
        cy.get('body').find('button[type="button"]').find('span[class*="anticon-right"]').click({force: true});
        cy.get('body').find('div[role="tabpanel"]').find('tr[data-row-key="0"]').find('td[class*="ant-table-cell-fix-left-last"]').invoke('text').should((text2) => {
          expect(text1).not.to.eq(text2);
          });
      });

      cy.get('ul[class*="ant-pagination"]').find('li[class*="ant-pagination-next"]').then(($pageNext) => {
        if ($pageNext.hasClass('ant-pagination-disabled')) {
          stop = true;
        }
      });
    }
  });
});