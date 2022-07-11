import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import { Space, Tag } from 'antd';
import { FhirApi } from 'api/fhir';
import { ServiceRequestEntity } from 'api/fhir/models';
import { INDEXES } from 'graphql/constants';
import { getPositionTag } from 'graphql/prescriptions/helper';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { useGlobals } from 'store/global';

import VariantSearchLayout from '../components/VariantSearchLayout';

import PageContent from './components/PageContent';

const CnvExplorationPatient = () => {
  const { patientid, prescriptionid } = useParams<{ patientid: string; prescriptionid: string }>();
  const [headerLoading, setHeaderLoading] = useState(false);
  const [prescription, setPrescription] = useState<ServiceRequestEntity>();
  const { getAnalysisNameByCode } = useGlobals();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);

  useEffect(() => {
    setHeaderLoading(true);
    FhirApi.fetchServiceRequestEntity(prescriptionid)
      .then(({ data }) => setPrescription(data?.data.ServiceRequest))
      .finally(() => setHeaderLoading(false));
  }, [prescriptionid]);

  return (
    <VariantSearchLayout
      contentHeaderProps={{
        title: intl.get('screen.variantsearch.title'),
        extra: [
          <Tag color="blue" key="patient-prescription-id">
            <Space align="center">
              {`Patient ID : ${patientid}`} | {`Prescription ID : ${prescriptionid}`}
            </Space>
          </Tag>,
          <div key="analsysis-name">
            {prescription && <Tag color="geekblue">{getAnalysisNameByCode(prescription.code)}</Tag>}
          </div>,
          getPositionTag(prescription, patientid),
        ],
        loading: headerLoading,
      }}
      menuItems={[]}
    >
      <PageContent
        variantMapping={variantMappingResults}
        patientId={patientid}
        prescriptionId={prescriptionid}
      />
    </VariantSearchLayout>
  );
};

const CnvExplorationPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <CnvExplorationPatient />
  </ApolloProvider>
);

export default CnvExplorationPatientWrapper;
