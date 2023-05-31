import { useCodeSystem, useObservationEthnicityEntity } from 'graphql/prescriptions/actions';
import find from 'lodash/find';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

import { useLang } from 'store/global';

type IDOwnProps = {
  id: string;
};

export const Ethnicity = ({ id }: IDOwnProps) => {
  const { ethValue } = useObservationEthnicityEntity(id);
  const { codeInfo } = useCodeSystem('qc-ethnicity');
  const lang = useLang();

  const value = find(
    codeInfo?.concept,
    (o) => o.code === ethValue?.valueCodeableConcept?.coding.code,
  );
  if (value) {
    const valueDisplay = find(value?.designation, (o) => o.language === lang);

    return <>{valueDisplay ? valueDisplay.value : value.display}</>;
  }
  return <>{EMPTY_FIELD}</>;
};
