import { useEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { useHistory, useLocation } from 'react-router-dom';
import { MedicineBoxOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { FhirApi } from 'api/fhir';
import { extractPatientId, extractServiceRequestId } from 'api/fhir/helper';
import { ServiceRequestEntity } from 'api/fhir/models';
import { useServiceRequestEntity } from 'graphql/prescriptions/actions';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import Forbidden from 'components/Results/Forbidden';

import PrescriptionDetails from './Tabs/Details';
import PrescriptionFiles from './Tabs/Files';
import PrescriptionVariants from './Tabs/Variants';
import { getPatientAndRequestId } from './Tabs/Variants/utils';
import PrescriptionEntityContext, {
  PrescriptionEntityContextType,
  PrescriptionEntityVariantInfo,
} from './context';

import styles from './index.module.scss';

interface OwnProps {
  prescriptionId: string;
}

enum PrescriptionEntityTabs {
  DETAILS = '#details',
  VARIANTS = '#variants',
  FILES = '#files',
}

const PrescriptionEntity = ({ prescriptionId }: OwnProps) => {
  const { hash } = useLocation();
  const { push } = useHistory();
  const [requestLoading, setRequestLoading] = useState(true);
  const { prescription, loading } = useServiceRequestEntity(prescriptionId);

  const [selectedRequest, setSelectedRequest] = useState<ServiceRequestEntity>();
  const [selectedBasedOnRequest, setBasedOnRequest] = useState<ServiceRequestEntity>();
  const [variantInfo, setVariantInfo] = useState<PrescriptionEntityVariantInfo>();

  useEffect(() => {
    const subjectRequestId = prescription?.subject?.resource?.requests?.[0]?.id;

    if (subjectRequestId) {
      FhirApi.fetchServiceRequestEntity(subjectRequestId).then(({ data }) => {
        setSelectedRequest(data?.data.ServiceRequest);
        data?.data.ServiceRequest.basedOn ? null : setRequestLoading(false);
      });
    }
  }, [prescription?.subject?.resource?.requests]);

  useEffect(() => {
    if (selectedRequest?.basedOn) {
      FhirApi.fetchServiceRequestEntity(selectedRequest?.basedOn.reference).then(({ data }) => {
        setBasedOnRequest(data?.data.ServiceRequest);
        setRequestLoading(false);
      });
    }
  }, [selectedRequest]);

  const memoedContextValue = useMemo<PrescriptionEntityContextType>(() => {
    const prescriptionId = prescription ? extractServiceRequestId(prescription.id) : undefined;
    const patientId = selectedBasedOnRequest
      ? extractPatientId(selectedBasedOnRequest?.subject.reference)
      : undefined;
    const { requestId } = getPatientAndRequestId(selectedBasedOnRequest?.subject.resource);

    return {
      loading: loading || requestLoading,
      patientId,
      prescription,
      prescriptionId,
      selectedRequest,
      selectedBasedOnRequest,
      setVariantInfo,
      variantInfo: variantInfo || {
        patientId,
        requestId,
      },
    };
  }, [
    prescription,
    selectedRequest,
    selectedBasedOnRequest,
    loading,
    requestLoading,
    variantInfo,
    setVariantInfo,
  ]);

  if (!loading && !prescription) {
    return <Forbidden />;
  }

  return (
    <PrescriptionEntityContext.Provider value={memoedContextValue}>
      <Tabs
        defaultActiveKey={PrescriptionEntityTabs.DETAILS}
        activeKey={hash || PrescriptionEntityTabs.DETAILS}
        onChange={(activeKey) => push({ hash: activeKey })}
        tabBarExtraContent={{
          left: (
            <Space direction="horizontal" className={styles.headerIcon}>
              <MedicineBoxOutlined />
              {prescriptionId}
            </Space>
          ),
        }}
        className={styles.prescriptionEntityContainer}
      >
        <Tabs.TabPane
          key={PrescriptionEntityTabs.DETAILS}
          tab={intl.get('prescription.tabs.title.details')}
        >
          <PrescriptionDetails />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={PrescriptionEntityTabs.VARIANTS}
          tab={intl.get('prescription.tabs.title.variants')}
        >
          <PrescriptionVariants />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={PrescriptionEntityTabs.FILES}
          tab={intl.get('prescription.tabs.title.files')}
        >
          <PrescriptionFiles />
        </Tabs.TabPane>
      </Tabs>
    </PrescriptionEntityContext.Provider>
  );
};

const PrescriptionEntityWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.FHIR}>
    <PrescriptionEntity {...props} />
  </ApolloProvider>
);

export default PrescriptionEntityWrapper;
