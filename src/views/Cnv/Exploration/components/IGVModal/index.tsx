import { useContext, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Modal } from 'antd';
import { FhirApi } from 'api/fhir';
import cx from 'classnames';
import { VariantEntity } from 'graphql/cnv/models';
import { usePatientFilesData } from 'graphql/patients/actions';
import { FhirTask, PatientFileResults } from 'graphql/patients/models/Patient';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import PrescriptionEntityContext from 'views/Prescriptions/Entity/context';
import { getVariantTypeFromCNVVariantEntity } from 'views/Prescriptions/Entity/Tabs/Variants/utils';

import IgvContainer from 'components/containers/IGV/IGVContainer';
import { IIGVTrack } from 'components/Igv/type';
import ServerError from 'components/Results/ServerError';
import { GENDER, PARENT_TYPE, PATIENT_POSITION } from 'utils/constants';
import { formatLocus } from 'utils/helper';
import { generateTracks, getHyperXenomeTrack } from 'utils/IGV';

import style from './index.module.css';

interface OwnProps {
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
  task?: FhirTask[],
) => {
  if (!patientFiles.docs) {
    return [];
  }

  const variantType = getVariantTypeFromCNVVariantEntity(variantEntity);
  const tracks: IIGVTrack[] = [];

  tracks.push(
    ...generateTracks(
      patientFiles,
      variantType,
      variantEntity.patient_id,
      variantEntity.gender as GENDER,
      variantEntity.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
      rpt,
      variantEntity.aliquot_id,
      task,
    ),
  );

  if (variantEntity.mother_id && motherFiles) {
    tracks.push(
      ...generateTracks(
        motherFiles,
        variantType,
        variantEntity.mother_id,
        GENDER.FEMALE,
        PARENT_TYPE.MOTHER,
        rpt,
        variantEntity.mother_aliquot_id,
      ),
    );
  }

  if (variantEntity.father_id && fatherFiles) {
    tracks.push(
      ...generateTracks(
        fatherFiles,
        variantType,
        variantEntity.father_id,
        GENDER.MALE,
        PARENT_TYPE.FATHER,
        rpt,
        variantEntity.father_aliquot_id,
      ),
    );
  }
  return tracks;
};

const IGVModal = ({ variantEntity, isOpen = false, toggleModal, rpt }: OwnProps) => {
  const { loading, results, error } = usePatientFilesData(variantEntity?.patient_id, !isOpen);
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
  } = usePatientFilesData(variantEntity?.mother_id!, !isOpen || !variantEntity?.mother_id);
  const {
    loading: fatherLoading,
    results: fatherResults,
    error: fatherError,
  } = usePatientFilesData(variantEntity?.father_id!, !isOpen || !variantEntity?.father_id);
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
          <IgvContainer
            locus={formatLocus(
              variantEntity?.start,
              variantEntity?.chromosome,
              100,
              variantEntity?.end,
            )}
            tracks={buildTracks(variantEntity, results!, motherResults, fatherResults, rpt, task)}
            hyperXenomeTrack={getHyperXenomeTrack(
              results,
              variantEntity.patient_id,
              variantEntity.gender as GENDER,
              variantEntity.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
              rpt,
              variantEntity.aliquot_id,
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
