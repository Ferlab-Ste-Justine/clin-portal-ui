import { Step } from 'react-shepherd';
import { offset } from '@floating-ui/dom';

export const steps: Step.StepOptions[] = [
  {
    id: 'intro',
    attachTo: { element: '', on: 'bottom' }, // If no element display like an intro
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        action() {
          return this.cancel();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        action() {
          return this.next();
        },
      },
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    cancelIcon: {
      enabled: true,
    },
    title: 'Créer un filtre',
    text: `<span>Un filtre permet aux utilisateurs de raffiner le résultats du tableau avec des requêtes des plus simples au plus complèxes. Par exemple, vous pouvez créer un filtre pour trouver des variantes de type <b>délétion</b>.</span>`,
  },
  {
    id: 'sideMenu',
    attachTo: { element: '#SidebarMenu_sider', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        action() {
          return this.cancel();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        action() {
          const element = document.querySelector('li[data-cy="SidebarMenuItem_Variant"]');
          if (element instanceof HTMLElement) {
            element.click();
          }

          setTimeout(() => {
            this.next();
          }, 400);
        },
      },
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    cancelIcon: {
      enabled: true,
    },
    floatingUIOptions: {
      middleware: [offset({ mainAxis: 12, crossAxis: 0 })],
    },
    title: 'Catégorie de critère',
    text: `<span>Sélectionnez la catégorie "Variant" de la colonne de filtres à gauche.</span>`,
  },
  {
    id: 'facet',
    modalOverlayOpeningPadding: 12,
    attachTo: { element: '#FilterContainer_collapseFacet', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        action() {
          return this.cancel();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        action() {
          const element = document.querySelector('#FilterContainer_collapseFacet');
          const collapseButton = element?.querySelector('.ant-collapse-header');

          if (collapseButton instanceof HTMLElement) {
            collapseButton.click();

            setTimeout(() => {
              const checkBox = document.querySelector('#input-deletion');
              console.log('checkBox1', checkBox);
              if (checkBox instanceof HTMLElement) {
                console.log('checkBox2', checkBox);
                // checkBox.click();
                checkBox.setAttribute('checked', 'true');
                const parent = checkBox.closest('span');
                if (parent instanceof HTMLElement) {
                  parent.setAttribute('class', 'ant-checkbox ant-checkbox-checked');
                }
                setTimeout(() => {
                  const apply = document.querySelector('span[data-cy="Apply_Variant Type"]');
                  const applyBtn = apply?.closest('button');
                  if (applyBtn instanceof HTMLElement) {
                    applyBtn.click();
                  }
                }, 400);
              }
            }, 400);
          }

          setTimeout(() => {
            this.next();
          }, 400);
        },
      },
    ],
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    cancelIcon: {
      enabled: true,
    },
    floatingUIOptions: {
      middleware: [offset({ mainAxis: 24, crossAxis: -20 })],
    },
    title: 'Application de critère',
    text: `<span>Ouvrez le critère “Type de variant” et sélectionnez la valeur “Deletion”.</span>`,
  },
  // {
  //   id: 'facetSearch',
  //   modalOverlayOpeningPadding: 12,
  //   attachTo: { element: '.Filters_filterWrapper__z9Mbc', on: 'right-end' },
  //   buttons: [
  //     {
  //       classes: 'shepherd-button-secondary',
  //       text: 'Exit',
  //       action() {
  //         return this.cancel();
  //       },
  //     },
  //     {
  //       classes: 'shepherd-button-primary',
  //       text: 'Back',
  //       action() {
  //         return this.back();
  //       },
  //     },
  //     {
  //       classes: 'shepherd-button-primary',
  //       text: 'Next',
  //       action() {
  //         return this.next();
  //       },
  //     },
  //   ],
  //   classes: 'custom-class-name-1 custom-class-name-2',
  //   highlightClass: 'highlight',
  //   scrollTo: false,
  //   cancelIcon: {
  //     enabled: true,
  //   },
  //   floatingUIOptions: {
  //     middleware: [offset({ mainAxis: 24, crossAxis: -20 })],
  //   },
  //   title: 'Facet search',
  //   text: ['Here you can filter by using our facets'],
  // },
];
