import { PractitionerRole } from 'api/fhir/models';
import { TUserConfig } from 'api/user/models';

export type TUserState = {
  isLoading: boolean;
  user: {
    config: TUserConfig;
    practitionerRoles: PractitionerRole[];
  };
};
