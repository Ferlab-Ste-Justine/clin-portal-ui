import intl from 'react-intl-universal';
import { useObservationConsanguinityEntity } from 'graphql/prescriptions/actions';
import { EMPTY_FIELD } from 'views/Prescriptions/Entity/constants';

type IDOwnProps = {
  id: string;
};

export const Consanguinity = ({ id }: IDOwnProps) => {
  const { conValue: consValue } = useObservationConsanguinityEntity(id);

  if (consValue) {
    return <>{consValue.valueBoolean ? intl.get('yes') : intl.get('no')}</>;
  }
  return <>{EMPTY_FIELD}</>;
};
