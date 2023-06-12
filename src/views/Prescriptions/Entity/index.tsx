import { useMemo } from 'react';
import { MedicineBoxOutlined } from '@ant-design/icons';
import { Space, Tabs } from 'antd';
import { useServiceRequestEntity } from 'graphql/prescriptions/actions';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';

import Forbidden from 'components/Results/Forbidden';

import PrescriptionDetails from './Tabs/Details';
import PrescriptionFiles from './Tabs/Files';
import PrescriptionVariants from './Tabs/Variants';
import PrescriptionEntityContext from './context';

import styles from './index.module.scss';

interface OwnProps {
  prescriptionId: string;
}

const PrescriptionEntity = ({ prescriptionId }: OwnProps) => {
  const { prescription, loading } = useServiceRequestEntity(prescriptionId);

  const memoedContextValue = useMemo(() => ({ prescription, loading }), [prescription, loading]);

  if (!loading && !prescription) {
    return <Forbidden />;
  }

  return (
    <PrescriptionEntityContext.Provider value={memoedContextValue}>
      <Tabs
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
        <Tabs.TabPane key="1" tab="Details">
          <PrescriptionDetails />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Variants">
          <PrescriptionVariants />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Fichiers">
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
