import { ISavedFilter } from '@ferlab/ui/core/components/QueryBuilder/types';

import { useAppDispatch } from 'store';
import {
  createCustomPill,
  deleteCustomPill,
  duplicateCustomPill,
  updateCustomPill,
} from 'store/customPill/thunks';

const useCustomPillsActions = (tag: string) => {
  const dispatch = useAppDispatch();

  const handleOnCreateCustomPill = (customPill: ISavedFilter) =>
    dispatch(
      createCustomPill({
        ...customPill,
        tag,
      }),
    );

  const handleOnUpdateCustomPill = (
    customPill: ISavedFilter,
    tag: string,
    queryBuilderId: string,
  ) => dispatch(updateCustomPill({ ...customPill, tag: tag, queryBuilderId: queryBuilderId }));

  const handleOnDeleteCustomPill = (id: string, queryBuilderId: string) =>
    dispatch(deleteCustomPill({ id, queryBuilderId, tag }));

  const handleOnDuplicateCustomPill = (customPill: ISavedFilter) =>
    dispatch(duplicateCustomPill({ ...customPill, tag }));

  return {
    handleOnCreateCustomPill,
    handleOnDeleteCustomPill,
    handleOnDuplicateCustomPill,
    handleOnUpdateCustomPill,
  };
};

export default useCustomPillsActions;
