import intl from 'react-intl-universal';
import { IQueriesSidebarDictionary } from '@ferlab/ui/core/components/CustomPill/QueriesSidebar/types';

export const getQueriesSidebarDictionary = (): IQueriesSidebarDictionary => ({
  emptyText: intl.get('screen.patientsnv.queriesSidebar.emptyText'),
  learnMore: intl.get('screen.patientsnv.queriesSidebar.learnMore'),
  title: intl.get('screen.patientsnv.queriesSidebar.title'),
  errorText: intl.get('screen.patientsnv.queriesSidebar.errorText'),
  deleteCustomPill: {
    modal: {
      title: intl.get('customPill.delete.modal.title'),
      okText: intl.get('customPill.delete.modal.okText'),
      cancelText: intl.get('customPill.delete.modal.cancelText'),
      message: intl.get('customPill.delete.modal.message'),
      existingFilters: intl.get('customPill.delete.modal.existingFilters'),
      errorMessage: intl.get('customPill.delete.modal.errorMessage'),
    },
  },
  editCustomPill: {
    title: intl.get('customPill.edit.title'),
    cancelText: intl.get('customPill.edit.cancelText'),
    saveText: intl.get('customPill.edit.saveText'),
    nameAlreadyExist: {
      message: intl.get('customPill.edit.nameAlreadyExist.message'),
      description: intl.get('customPill.edit.nameAlreadyExist.description'),
      okText: intl.get('customPill.edit.nameAlreadyExist.okText'),
    },
    save: {
      confirmation: {
        title: intl.get('customPill.edit.save.confirmation.title'),
        message: intl.get('customPill.edit.save.confirmation.message'),
        existingFilters: intl.get('customPill.edit.save.confirmation.existingFilters'),
        existingFiltersError: intl.get('customPill.edit.save.confirmation.existingFiltersError'),
        cancelText: intl.get('customPill.edit.save.confirmation.cancelText'),
        okText: intl.get('customPill.edit.save.confirmation.okText'),
      },
      emptyQuery: {
        title: intl.get('customPill.edit.save.emptyQuery.title'),
        message: intl.get('customPill.edit.save.emptyQuery.message'),
        closeText: intl.get('customPill.edit.save.emptyQuery.closeText'),
      },
    },
  },
});
