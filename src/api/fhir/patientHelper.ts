import { get } from 'lodash';

import { ClinicalImpression, Name, ServiceRequestEntityExtension } from './models';

export const RAMQ_NUMBER_LENGTH = 12;

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
    : value;

export const checkIfPatientIfAffected = (extension: ServiceRequestEntityExtension) =>
  get(get(extension, 'extension[1].valueReference.resource', {}), 'clinicalImpressions', []).some(
    (impression: ClinicalImpression) =>
      get(impression.investigation[0], 'item[0].resource.interpretation.coding[0].code', 'NEG') ===
      'POS',
  );

export const formatName = (name: Name) => `${name.given} ${name.family}`;
