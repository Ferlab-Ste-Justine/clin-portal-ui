import intl from 'react-intl-universal';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import UploadIds from '@ferlab/ui/core/components/UploadIds';
import { MatchTableItem } from '@ferlab/ui/core/components/UploadIds/types';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Descriptions } from 'antd';
import { ArrangerApi } from 'api/arranger';
import { INDEXES } from 'graphql/constants';
import { CHECK_GENE_MATCH_QUERY } from 'graphql/genes/queries';
import { hydrateResults } from 'graphql/models';
import { GeneEntity } from 'graphql/variants/models';

import styles from './index.module.css';

interface OwnProps {
  queryBuilderId: string;
  field: string;
}

const GenesUploadIds = ({ queryBuilderId, field }: OwnProps) => (
  <UploadIds
    dictionary={{
      modalTitle: intl.get('upload.gene.ids.modal.title'),
      submittedColTitle: intl.get('upload.gene.ids.modal.submittedColTitle'),
      uploadBtnText: intl.get('upload.gene.ids.modal.uploadBtnText'),
      modalUploadBtnText: intl.get('upload.gene.ids.modal.upload.file.btn'),
      mappedTo: intl.get('upload.gene.ids.modal.mappedTo'),
      clear: intl.get('upload.gene.ids.modal.clear.btn'),
      emptyTableDescription: intl.get('upload.gene.ids.modal.empty.table'),
      modalOkText: intl.get('upload.gene.ids.modal.upload.btn'),
      modalCancelText: intl.get('upload.gene.ids.modal.cancel.btn'),
      collapseTitle: (matchCount, unMatchCount) =>
        intl.get('upload.gene.ids.modal.collapseTitle', {
          matchCount,
          unMatchCount,
        }),
      matchTabTitle: (matchCount) => intl.get('upload.gene.ids.modal.match', { count: matchCount }),
      unmatchTabTitle: (unmatchcount) =>
        intl.get('upload.gene.ids.modal.unmatch', { count: unmatchcount }),
      tablesMessage: (submittedCount, mappedCount) =>
        intl.get('upload.gene.ids.modal.table.message', {
          submittedCount,
          mappedCount,
        }),
      inputLabel: intl.get('upload.gene.ids.modal.input.label'),
      inputLimitError: intl.get('upload.gene.ids.modal.input.limit'),
      inputLimitErrorText: intl.get('upload.gene.ids.modal.input.limit.text'),
      matchTable: {
        idColTitle: intl.get('upload.gene.ids.modal.match.table.idcol.title'),
        matchToFieldColTitle: intl.get('upload.gene.ids.modal.match.table.matchcol.title'),
        mappedToFieldColTitle: intl.get('upload.gene.ids.modal.match.table.mappedcol.title'),
      },
    }}
    limitItem={1500}
    placeHolder="ex. ENSG00000157764, TP53"
    popoverProps={{
      title: intl.get('upload.gene.ids.modal.tooltip.title'),
      overlayClassName: styles.geneUploadIdsPopover,
      content: (
        <Descriptions column={1}>
          <Descriptions.Item label={intl.get('upload.gene.ids.modal.tooltip.label.identifiers')}>
            {intl.get('upload.gene.ids.modal.tooltip.info.identifiers')}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('upload.gene.ids.modal.tooltip.label.separatedBy')}>
            {intl.get('upload.gene.ids.modal.tooltip.info.separatedBy')}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('upload.gene.ids.modal.tooltip.label.fileFormats')}>
            {intl.get('upload.gene.ids.modal.tooltip.info.fileFormats')}
          </Descriptions.Item>
          <Descriptions.Item label={intl.get('upload.gene.ids.modal.tooltip.label.limit')}>
            {intl.get('upload.gene.ids.modal.tooltip.info.limit')}
          </Descriptions.Item>
        </Descriptions>
      ),
    }}
    fetchMatch={async (ids) => {
      const response = await ArrangerApi.graphqlRequest({
        query: CHECK_GENE_MATCH_QUERY.loc?.source.body,
        variables: {
          first: 1500,
          offset: 0,
          sqon: generateQuery({
            operator: BooleanOperators.or,
            newFilters: ['symbol', 'ensembl_gene_id'].map((field) =>
              generateValueFilter({
                field,
                value: ids,
                index: INDEXES.GENE,
              }),
            ),
          }),
        },
      });

      const genes: GeneEntity[] = hydrateResults(response.data?.data?.Genes?.hits?.edges || []);

      const matchResults = ids.map((id, index) => {
        const upperCaseId = id.toUpperCase();
        const gene = genes.find((gene) =>
          [gene.symbol?.toUpperCase(), gene.ensembl_gene_id?.toUpperCase()].includes(upperCaseId),
        );
        return gene
          ? {
              key: index.toString(),
              submittedId: id,
              mappedTo: gene.symbol,
              matchTo: gene.ensembl_gene_id,
            }
          : undefined;
      });

      return matchResults.filter((x) => x !== undefined) as MatchTableItem[];
    }}
    onUpload={(match) =>
      updateActiveQueryField({
        queryBuilderId,
        field,
        value: match.map((value) => value.mappedTo),
        index: INDEXES.VARIANT,
        overrideValuesName: intl.get('upload.gene.ids.modal.pill.title'),
        merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
      })
    }
  />
);

export default GenesUploadIds;
