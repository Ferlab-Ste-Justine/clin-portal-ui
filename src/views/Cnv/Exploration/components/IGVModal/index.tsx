import intl from 'react-intl-universal';
import { Modal } from 'antd';
import cx from 'classnames';
import { VariantEntity } from 'graphql/cnv/models';
import { usePatientFilesData } from 'graphql/patients/actions';
import { PatientFileResults } from 'graphql/patients/models/Patient';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import IgvContainer from 'components/containers/IGV/IGVContainer';
import { IIGVTrack } from 'components/Igv/type';
import ServerError from 'components/Results/ServerError';
import { GENDER, PARENT_TYPE, PATIENT_POSITION } from 'utils/constants';
import { formatLocus } from 'utils/helper';
import { generateTracks, getHyperXenomeTrack } from 'utils/IGV';

import style from './index.module.scss';

interface OwnProps {
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
  variantEntity: VariantEntity,
) => {
  if (!patientFiles.docs) {
    return [];
  }

  const tracks: IIGVTrack[] = [];

  tracks.push(
    ...generateTracks(
      patientFiles,
      variantEntity.patient_id,
      variantEntity.gender as GENDER,
      variantEntity.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
      rpt,
    ),
  );

  if (variantEntity.mother_id && motherFiles) {
    tracks.push(
      ...generateTracks(
        motherFiles,
        variantEntity.mother_id,
        GENDER.FEMALE,
        PARENT_TYPE.MOTHER,
        rpt,
      ),
    );
  }

  if (variantEntity.father_id && fatherFiles) {
    tracks.push(
      ...generateTracks(fatherFiles, variantEntity.father_id, GENDER.MALE, PARENT_TYPE.FATHER, rpt),
    );
  }
  return tracks;
};

const IGVModal = ({ variantEntity, isOpen = false, toggleModal, rpt }: OwnProps) => {
  const { loading, results, error } = usePatientFilesData(variantEntity?.patient_id, !isOpen);
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
            tracks={buildTracks(results!, motherResults, fatherResults, rpt, variantEntity!)}
            hyperXenomeTrack={getHyperXenomeTrack(
              results,
              variantEntity.patient_id,
              variantEntity.gender as GENDER,
              variantEntity.is_proband ? PATIENT_POSITION.PROBAND : PATIENT_POSITION.PARENT,
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
