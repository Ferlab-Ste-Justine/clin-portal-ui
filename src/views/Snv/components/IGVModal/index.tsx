import intl from 'react-intl-universal';
import { Modal } from 'antd';
import cx from 'classnames';
import { usePatientFilesData } from 'graphql/patients/actions';
import { PatientFileResults } from 'graphql/patients/models/Patient';
import { DonorsEntity, VariantEntity } from 'graphql/variants/models';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import IGVContainer from 'components/containers/IGV/IGVContainer';
import { IIGVTrack } from 'components/Igv/type';
import ServerError from 'components/Results/ServerError';
import { GENDER, PARENT_TYPE, PATIENT_POSITION } from 'utils/constants';
import { formatLocus } from 'utils/helper';
import { generateTracks, getHyperXenomeTrack } from 'utils/IGV';

import style from './index.module.scss';

interface OwnProps {
  donor: DonorsEntity;
  variantEntity: VariantEntity;
  isOpen?: boolean;
  toggleModal: (visible: boolean) => void;
  rpt: string;
}
const buildTracks = (
  patientFiles: PatientFileResults,
  motherFiles: PatientFileResults,
  fatherFiles: PatientFileResults,
  rpt: string,
  donor: DonorsEntity,
) => {
  if (!patientFiles.docs) {
    return [];
  }

  const tracks: IIGVTrack[] = [];

  tracks.push(
    ...generateTracks(
      patientFiles,
      donor.patient_id,
      donor.gender as GENDER,
      donor.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
      rpt,
    ),
  );

  if (donor.mother_id && motherFiles) {
    tracks.push(
      ...generateTracks(motherFiles, donor.mother_id, GENDER.FEMALE, PARENT_TYPE.MOTHER, rpt),
    );
  }

  if (donor.father_id && fatherFiles) {
    tracks.push(
      ...generateTracks(fatherFiles, donor.father_id, GENDER.MALE, PARENT_TYPE.FATHER, rpt),
    );
  }

  return tracks;
};

const IGVModal = ({ donor, variantEntity, isOpen = false, toggleModal, rpt }: OwnProps) => {
  const { loading, results, error } = usePatientFilesData(donor?.patient_id, !isOpen);
  const {
    loading: motherLoading,
    results: motherResults,
    error: motherError,
  } = usePatientFilesData(donor?.mother_id!, !isOpen || !donor?.mother_id);
  const {
    loading: fatherLoading,
    results: fatherResults,
    error: fatherError,
  } = usePatientFilesData(donor?.father_id!, !isOpen || !donor?.father_id);

  return (
    <Modal
      width="90vw"
      visible={isOpen}
      footer={false}
      title={intl.get('screen.patientsnv.drawer.igv.title')}
      onCancel={() => toggleModal(false)}
      className={cx(style.igvModal, 'igvModal')}
      wrapClassName={cx(style.igvModalWrapper, 'igvModalWrapper')}
    >
      {error || motherError || fatherError ? (
        <ServerError />
      ) : (
        isOpen &&
        !(loading || motherLoading || fatherLoading) && (
          <IGVContainer
            locus={formatLocus(variantEntity?.start, variantEntity?.chromosome, 20)}
            tracks={buildTracks(results!, motherResults, fatherResults, rpt, donor!)}
            hyperXenomeTrack={getHyperXenomeTrack(
              results,
              donor.patient_id,
              donor.gender as GENDER,
              donor.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
              rpt,
            )}
          />
        )
      )}
    </Modal>
  );
};

const IGVModalWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <IGVModal {...props} />
  </ApolloProvider>
);

export default IGVModalWrapper;
