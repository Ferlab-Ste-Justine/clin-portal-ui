import { useContext } from 'react';
import { extractServiceRequestId } from 'api/fhir/helper';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';

import PrescriptionEntityContext from '../../context';

const PrescriptionFiles = () => {
  const { prescription } = useContext(PrescriptionEntityContext);

  return (
    <ScrollContentWithFooter container>
      <>Files for {extractServiceRequestId(prescription?.id!)}</>
    </ScrollContentWithFooter>
  );
};

export default PrescriptionFiles;
