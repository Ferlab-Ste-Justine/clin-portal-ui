import { capitalize, get } from 'lodash';

import { EMPTY_FIELD } from '../../components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';

import { Name, Patient, ServiceRequestEntityExtension } from './models';

export const RAMQ_NUMBER_LENGTH = 12;

export type AffectedStatusCode = 'POS' | 'NEG' | 'IND';

export const AFFECTED_STATUS_CODE = {
  POS: 'affected',
  NEG: 'not_affected',
  IND: 'unknown',
};

export const getRAMQValue = (patient?: Patient): string | undefined =>
  patient
    ? patient.identifier.find((id) => get(id, 'type.coding[0].code', '') === 'JHN')?.value
    : undefined;

export const formatRamq = (value: string) =>
  value
    ? value
        .toUpperCase()
        .replace(/\s/g, '')
        .split('')
        .splice(0, RAMQ_NUMBER_LENGTH)
        .reduce(
          (acc, char, index) =>
            char !== ' ' && [3, 7].includes(index) ? `${acc}${char} ` : `${acc}${char}`,
          '',
        )
        .trimEnd()
    : EMPTY_FIELD;

export const getPatientAffectedStatus = (extension: ServiceRequestEntityExtension) => {
  const item = get(
    extension,
    'extension[1].valueReference.resource.clinicalImpressions[0].investigation[0].item[0].item',
    [],
  );
  return AFFECTED_STATUS_CODE[get(item, 'interpretation.coding.code') as AffectedStatusCode];
};

export const formatName = (name: Name) => `${name.family.toUpperCase()} ${capitalize(name.given)} `;
