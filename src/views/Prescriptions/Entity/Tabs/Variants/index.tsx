import { useContext } from 'react';
import { extractServiceRequestId } from 'api/fhir/helper';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';

import PrescriptionEntityContext from '../../context';

const PrescriptionVariants = () => {
  const { prescription } = useContext(PrescriptionEntityContext);

  return (
    <ScrollContentWithFooter container>
      <>Variants for {extractServiceRequestId(prescription?.id!)}</>
    </ScrollContentWithFooter>
  );
};

export default PrescriptionVariants;
