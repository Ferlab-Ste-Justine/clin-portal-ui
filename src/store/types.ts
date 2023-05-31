import { GlobalInitialState } from 'store/global';
import { TUserState } from 'store/user';

import { TReportState } from './reports';
import { SavedFilterInitialState } from './savedFilter';

export type RootState = {
  global: GlobalInitialState;
  report: TReportState;
  user: TUserState;
  savedFilter: SavedFilterInitialState;
};
