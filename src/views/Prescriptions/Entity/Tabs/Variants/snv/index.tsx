import SidebarMenu from '@ferlab/ui/core/components/SidebarMenu';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';
import { GraphqlBackend } from 'providers';
import ApolloProvider from 'providers/ApolloProvider';
import { usePrescriptionEntityContext } from 'views/Prescriptions/Entity/context';
import { getMenuItems } from 'views/Snv/Exploration/Patient/facets';
import PageContent from 'views/Snv/Exploration/Patient/PageContent';
import { SCROLL_WRAPPER_ID } from 'views/Snv/utils/constant';
import { wrapSqonWithDonorIdAndSrId } from 'views/Snv/utils/helper';

import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';

import { VariantSection } from '../components/VariantSectionNav';

import styles from './index.module.css';

interface OwnProps {
  variantSection?: VariantSection;
}

const SnvPatient = ({ variantSection }: OwnProps) => {
  const { prescriptionId, variantInfo } = usePrescriptionEntityContext();
  const variantMappingResults = useGetExtendedMappings(INDEXES.VARIANT);
  const filterMapper = (filters: ISqonGroupFilter) =>
    wrapSqonWithDonorIdAndSrId(filters, variantInfo.patientId, prescriptionId, variantSection);
  return (
    <div className={styles.snvVariant}>
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={getMenuItems(
          variantMappingResults,
          filterMapper,
          variantInfo.variantType,
          variantSection,
        )}
      />
      <ScrollContentWithFooter scrollId={SCROLL_WRAPPER_ID}>
        <PageContent
          variantMapping={variantMappingResults}
          patientId={variantInfo.patientId}
          prescriptionId={prescriptionId}
          variantSection={variantSection}
        />
      </ScrollContentWithFooter>
    </div>
  );
};

const SnvPatientWrapper = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <SnvPatient {...props} />
  </ApolloProvider>
);

export default SnvPatientWrapper;
