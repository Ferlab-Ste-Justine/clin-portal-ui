import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';

export type TUser = {
  id: string;
  creation_date: Date;
  updated_date: Date;
  keycloak_id: string;
  email: string;
  first_name: string;
  last_name: string;
  completed_registration: boolean;
  config: TUserConfig;
};

export type TUserTableConfig = {
  columns?: TColumnStates;
  viewPerQuery?: PaginationViewPerQuery;
};

export type TUserConfig = {
  data_exploration?: {
    tables?: {
      archives?: TUserTableConfig;
      patientSnv?: TUserTableConfig;
      patientCnv?: TUserTableConfig;
      prescriptions?: TUserTableConfig;
      prescriptionEntityFiles?: TUserTableConfig;
      requests?: TUserTableConfig;
      snv?: TUserTableConfig;
      genes?: TUserTableConfig;
    };
  };
};

export type TUserCreate = Omit<TUser, 'id' | 'creation_date' | 'updated_date'>;
export type TUserUpdate = Partial<TUserCreate>;
