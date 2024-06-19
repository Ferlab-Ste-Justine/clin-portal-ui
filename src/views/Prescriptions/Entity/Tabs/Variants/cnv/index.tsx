import SidebarMenu from '@ferlab/ui/core/components/SidebarMenu';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import PageContent from 'views/Cnv/Exploration/Patient/components/PageContent';
import { getMenuItems } from 'views/Cnv/Exploration/Patient/facets';
import { SCROLL_WRAPPER_ID } from 'views/Cnv/utils/constant';
import { wrapSqonWithPatientIdAndRequestId } from 'views/Cnv/utils/helper';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import styles from './index.module.css';

const CnvPatient = () => {
  const { prescriptionId, variantInfo } = usePrescriptionEntityContext();
  const variantMappingResults = useGetExtendedMappings(INDEXES.CNV);
  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithPatientIdAndRequestId(filters, variantInfo.patientId, prescriptionId);

  return (
    <div className={styles.cnvVariant}>
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={getMenuItems(variantMappingResults, filterMapper)}
      />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent
          variantMapping={variantMappingResults}
          patientId={variantInfo.patientId}
          prescriptionId={prescriptionId}
        />
      </ScrollContentWithFooter>
    </div>
  );
};

const CnvPatientWrapper = () => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <CnvPatient />
  </ApolloProvider>
);

export default CnvPatientWrapper;
