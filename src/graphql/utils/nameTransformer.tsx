import intl from 'react-intl-universal';
import { extractOrganizationId } from 'api/fhir/helper';

import { getAnalysisNameByCodeFromLocal } from 'utils/fhir';

export const transformNameIfNeeded = (field: string, fkey: string, name: string) => {
  if (field.includes('lastNameFirstName') && fkey) {
    const nameSplit = fkey.split(',');
    return `${nameSplit[0].toUpperCase()} ${nameSplit[1]}`;
  }

  if (field === 'chromosome') {
    return name === 'true' ? '1' : name;
  }

  if (field === 'laboratory') {
    return extractOrganizationId(name);
  }

  if (['analysis_code', 'donors__analysis_code', 'panels', 'genes__panels'].includes(field)) {
    return getAnalysisNameByCodeFromLocal(fkey, fkey, true);
  }

  if (fkey.includes('_variant')) {
    return name.replace('Variant', '');
  }

  if (
    ['Male', 'Female', 'unknown', 'Other'].includes(fkey) &&
    !field.includes('parental_origin') &&
    !field.includes('donors__affected_status_code')
  ) {
    return intl.get(`sex.${fkey.toLowerCase()}`);
  }
  if (
    ['affected', 'not_affected'].includes(fkey) &&
    field.includes('donors') &&
    field.includes('status')
  ) {
    return intl.get(fkey);
  }
  return name;
};
