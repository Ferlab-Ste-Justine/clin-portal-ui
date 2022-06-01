import { ArrangerResultsTree } from '../models';

import { DonorsEntity } from './models';

export const findDonorById = (
  donors: ArrangerResultsTree<DonorsEntity> | undefined,
  patientId: string,
) => donors?.hits?.edges?.find((donor) => donor.node.patient_id === patientId)?.node;
