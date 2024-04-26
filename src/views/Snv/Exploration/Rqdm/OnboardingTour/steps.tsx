import { Step } from 'react-shepherd';
import { offset } from '@floating-ui/dom';

export const steps: Step.StepOptions[] = [
  {
    id: 'intro',
    attachTo: { element: '', on: 'bottom' }, // If no element display like an intro
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Préc.',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Suiv.',
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
    when: {
      show() {
        const activeTour = this.getTour();
        const currentStep = activeTour?.getCurrentStep();
        const currentStepElement = currentStep?.getElement();
        const footer = currentStepElement?.querySelector('.shepherd-footer');
        const progress = document.createElement('span');
        progress.className = 'shepherd-progress';
        progress.innerText = `${activeTour?.steps.indexOf(this) + 1} of ${
          activeTour?.steps.length
        }`;
        footer?.insertBefore(
          progress,
          currentStepElement!.querySelector('.shepherd-button:last-child'),
        );
      },
    },
  },
  {
    id: 'sideMenu',
    attachTo: { element: '#SidebarMenu_sider', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Préc.',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Suiv.',
        action() {
          const element = document.querySelector('li[data-cy="SidebarMenuItem_Variant"]');
          if (element instanceof HTMLElement) {
            element.click();
          }

          setTimeout(() => {
            const element = document.querySelector('#FilterContainer_collapseFacet');
            const collapseButton = element?.querySelector('.ant-collapse-header');

            if (collapseButton instanceof HTMLElement) {
              collapseButton.click();
            }
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
    when: {
      show() {
        const activeTour = this.getTour();
        const currentStep = activeTour?.getCurrentStep();
        const currentStepElement = currentStep?.getElement();
        const footer = currentStepElement?.querySelector('.shepherd-footer');
        const progress = document.createElement('span');
        progress.className = 'shepherd-progress';
        progress.innerText = `${activeTour?.steps.indexOf(this) + 1} of ${
          activeTour?.steps.length
        }`;
        footer?.insertBefore(
          progress,
          currentStepElement!.querySelector('.shepherd-button:last-child'),
        );
      },
    },
  },
  {
    id: 'facet',
    modalOverlayOpeningPadding: 12,
    attachTo: { element: '#FilterContainer_collapseFacet', on: 'right' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Préc.',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Suiv.',
        action() {
          const apply = document.querySelector('span[data-cy="Apply_Type de variant"]');
          const applyBtn = apply?.closest('button');
          if (applyBtn instanceof HTMLElement) {
            console.log('click');
            applyBtn.click();
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
    when: {
      show() {
        const activeTour = this.getTour();
        const currentStep = activeTour?.getCurrentStep();
        const currentStepElement = currentStep?.getElement();
        const footer = currentStepElement?.querySelector('.shepherd-footer');
        const progress = document.createElement('span');
        progress.className = 'shepherd-progress';
        progress.innerText = `${activeTour?.steps.indexOf(this) + 1} of ${
          activeTour?.steps.length
        }`;
        footer?.insertBefore(
          progress,
          currentStepElement!.querySelector('.shepherd-button:last-child'),
        );
      },
    },
  },
  {
    id: 'QB',
    modalOverlayOpeningPadding: 12,
    attachTo: { element: '#query-builder-header-tools', on: 'bottom' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Préc.',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Suiv.',
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
    floatingUIOptions: {
      middleware: [offset({ mainAxis: 24, crossAxis: -20 })],
    },
    title: 'Création d’une query',
    text: `<span>Vous venez de créer votre premier filtre et les données dans le tableau ci-dessous sont raffinées en conséquence. Un filtre contient une ou plusieurs requêtes.</span>`,
    when: {
      show() {
        const activeTour = this.getTour();
        const currentStep = activeTour?.getCurrentStep();
        const currentStepElement = currentStep?.getElement();
        const footer = currentStepElement?.querySelector('.shepherd-footer');
        const progress = document.createElement('span');
        progress.className = 'shepherd-progress';
        progress.innerText = `${activeTour?.steps.indexOf(this) + 1} of ${
          activeTour?.steps.length
        }`;
        footer?.insertBefore(
          progress,
          currentStepElement!.querySelector('.shepherd-button:last-child'),
        );
      },
    },
  },
  {
    id: 'SaveFilter',
    modalOverlayOpeningPadding: 12,
    attachTo: { element: '#QBH_editName', on: 'bottom' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Préc.',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Suiv.',
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
    floatingUIOptions: {
      middleware: [offset({ mainAxis: 24, crossAxis: -20 })],
    },
    title: 'Sauvegarder une query',
    text: `<span>Nommons cette query et sauvegardons la en cliquant le bouton "Sauvegarder le filtre" en haut à droite!</span>`,
    when: {
      show() {
        const activeTour = this.getTour();
        const currentStep = activeTour?.getCurrentStep();
        const currentStepElement = currentStep?.getElement();
        const footer = currentStepElement?.querySelector('.shepherd-footer');
        const progress = document.createElement('span');
        progress.className = 'shepherd-progress';
        progress.innerText = `${activeTour?.steps.indexOf(this) + 1} of ${
          activeTour?.steps.length
        }`;
        footer?.insertBefore(
          progress,
          currentStepElement!.querySelector('.shepherd-button:last-child'),
        );
      },
    },
  },
  {
    id: 'ShareFilter',
    modalOverlayOpeningPadding: 12,
    attachTo: { element: '#QBH_shareFilter', on: 'bottom' },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Préc.',
        action() {
          return this.back();
        },
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Fermer',
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
    floatingUIOptions: {
      middleware: [offset({ mainAxis: 24, crossAxis: -20 })],
    },
    title: 'Partager une query',
    text: `<span>Maintenant que ce filtre est sauvegardé, vous pouvez l’envoyer à vos collègues pour qu’ils puissent travailler avec les mêmes résultats.</span>`,
    when: {
      show() {
        const activeTour = this.getTour();
        const currentStep = activeTour?.getCurrentStep();
        const currentStepElement = currentStep?.getElement();
        const footer = currentStepElement?.querySelector('.shepherd-footer');
        const progress = document.createElement('span');
        progress.className = 'shepherd-progress';
        progress.innerText = `${activeTour?.steps.indexOf(this) + 1} of ${
          activeTour?.steps.length
        }`;
        footer?.insertBefore(
          progress,
          currentStepElement!.querySelector('.shepherd-button:last-child'),
        );
      },
    },
  },
];
