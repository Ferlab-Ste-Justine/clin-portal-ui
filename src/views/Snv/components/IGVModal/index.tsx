import { useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Modal } from 'antd';
import { FhirApi } from 'api/fhir';
import cx from 'classnames';
import { usePatientFilesData } from 'graphql/patients/actions';
import { FhirTask, PatientFileResults } from 'graphql/patients/models/Patient';
import { DonorsEntity, VariantEntity } from 'graphql/variants/models';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import PrescriptionEntityContext from 'views/Prescriptions/Entity/context';
import { getVariantTypeFromSNVVariantEntity } from 'views/Prescriptions/Entity/Tabs/Variants/utils';

import IGVContainer from 'components/containers/IGV/IGVContainer';
import { IIGVTrack } from 'components/Igv/type';
import ServerError from 'components/Results/ServerError';
import { GENDER, PARENT_TYPE, PATIENT_POSITION } from 'utils/constants';
import { formatLocus } from 'utils/helper';
import { generateTracks, getHyperXenomeTrack } from 'utils/IGV';

import style from './index.module.css';

interface OwnProps {
  donor: DonorsEntity;
  variantEntity: VariantEntity;
  isOpen?: boolean;
  toggleModal: (visible: boolean) => void;
  rpt: string;
}
const buildTracks = (
  variantEntity: VariantEntity,
  patientFiles: PatientFileResults,
  motherFiles: PatientFileResults,
  fatherFiles: PatientFileResults,
  rpt: string,
  donor: DonorsEntity,
  task?: FhirTask[],
) => {
  if (!patientFiles.docs) {
    return [];
  }

  const variantType = getVariantTypeFromSNVVariantEntity(variantEntity);
  const tracks: IIGVTrack[] = [];

  tracks.push(
    ...generateTracks(
      patientFiles,
      variantType,
      donor.patient_id,
      donor.gender as GENDER,
      donor.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
      rpt,
      donor.aliquot_id,
      task,
    ),
  );

  if (donor.mother_id && motherFiles) {
    tracks.push(
      ...generateTracks(
        motherFiles,
        variantType,
        donor.mother_id,
        GENDER.FEMALE,
        PARENT_TYPE.MOTHER,
        rpt,
        donor.mother_aliquot_id,
      ),
    );
  }

  if (donor.father_id && fatherFiles) {
    tracks.push(
      ...generateTracks(
        fatherFiles,
        variantType,
        donor.father_id,
        GENDER.MALE,
        PARENT_TYPE.FATHER,
        rpt,
        donor.father_aliquot_id,
      ),
    );
  }

  return tracks;
};

const IGVModal = ({ donor, variantEntity, isOpen = false, toggleModal, rpt }: OwnProps) => {
  const { loading, results, error } = usePatientFilesData(donor?.patient_id, !isOpen);
  const [task, setTask] = useState<FhirTask[]>();
  const { selectedRequest } = useContext(PrescriptionEntityContext);
  useEffect(() => {
    if (selectedRequest?.id) {
      FhirApi.searchRequestTask(selectedRequest.id).then(({ data }) => {
        if (data?.data.taskList) {
          setTask(data?.data.taskList);
        }
      });
    }
  }, [selectedRequest]);

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
            tracks={buildTracks(
              variantEntity,
              results!,
              motherResults,
              fatherResults,
              rpt,
              donor!,
              task,
            )}
            hyperXenomeTrack={getHyperXenomeTrack(
              results,
              donor.patient_id,
              donor.gender as GENDER,
              donor.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
              rpt,
              donor.aliquot_id,
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
