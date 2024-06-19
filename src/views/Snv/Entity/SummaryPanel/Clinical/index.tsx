import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Space, Table, Typography } from 'antd';
import { useTabClinicalData } from 'graphql/variants/tabActions';
import NoData from 'views/Snv/Entity/NoData';

import CollapsePanel from 'components/containers/collapse';

import { columnsClinVar, columnsPhenotypes } from './columns';
import { makeClinVarRows, makeGenesOrderedRow } from './utils';

import styles from './index.module.css';

interface OwnProps {
  locus: string;
}

const { Title } = Typography;

const ClinicalCard = ({ locus }: OwnProps) => {
  const { loading, data } = useTabClinicalData(locus);

  const dataClinvar = data?.clinvar || {};
  const clinvarId = dataClinvar.clinvar_id;
  const dataGenes = data?.genes || {};

  const clinVarRows = makeClinVarRows(dataClinvar);
  const clinVarHasRows = clinVarRows.length > 0;

  const genesRows = makeGenesOrderedRow(dataGenes);
  const genesHasRows = genesRows.length > 0;

  return (
    <>
      <Title level={3}>{intl.get('screen.variantDetails.summaryTab.clinicalCardTitle')}</Title>
      <Space direction="vertical" className={styles.clinicalCard} size={16}>
        <CollapsePanel
          header={
            <Space size="middle">
              <Title level={4}>ClinVar</Title>
              {clinvarId ? (
                <ExternalLink
                  onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
                  className={styles.externalLink}
                  href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvarId}`}
                  hasIcon={true}
                  data-cy={`ClinicalCard_ClinVar_${clinvarId}_ExternalLink`}
                >
                  {clinvarId}
                </ExternalLink>
              ) : (
                ''
              )}
            </Space>
          }
          loading={loading}
          datacy="ClinicalCard_ClinVar"
        >
          {clinVarHasRows ? (
            <Table
              pagination={false}
              dataSource={clinVarRows}
              columns={columnsClinVar}
              bordered
              size="small"
              rowKey={(record) => `ClinicalCard_ClinVar_${record.key}`}
            />
          ) : (
            <NoData />
          )}
        </CollapsePanel>
        <CollapsePanel
          header={
            <Title level={4}>
              {intl.get('screen.variantDetails.clinicalAssociationsTab.genePhenotype')}
            </Title>
          }
          loading={loading}
          datacy="ClinicalCard_GenePhenotype"
        >
          {genesHasRows ? (
            <Table
              bordered
              pagination={false}
              dataSource={genesRows}
              columns={columnsPhenotypes}
              size="small"
              rowKey={(record) => `ClinicalCard_GenePhenotype_${record.source}_${record.gene}`}
            />
          ) : (
            <NoData />
          )}
        </CollapsePanel>
      </Space>
    </>
  );
};

export default ClinicalCard;
