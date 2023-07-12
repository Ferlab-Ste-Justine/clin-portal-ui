import { TUserSavedFilter } from 'api/savedFilter/models';

export type TCustomPillState = {
  customPills: Record<string, TUserSavedFilter[]>;
  isLoading: boolean;
  fetchError: boolean;
};
