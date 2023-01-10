import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Space, Tag, Tooltip } from 'antd';
import cx from 'classnames';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';
import {
  ClinVar,
  Consequence,
  DonorsEntity,
  ExternalFrequenciesEntity,
  frequency_RQDMEntity,
  Gene,
  ITableVariantEntity,
  VariantEntity,
  Varsome,
  VarsomeClassifications,
} from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { capitalize } from 'lodash';
import ConsequencesCell from 'views/Snv/components/ConsequencesCell';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import UserAffectedIcon from 'components/icons/UserAffectedIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import GqLine from '../components/GQLine';
import { HcComplementDescription } from '../components/OccurrenceDrawer/HcDescription';
import { TAB_ID } from '../Entity';

import AcmgVerdict from './components/AcmgVerdict';
import { OtherActions } from './components/OtherActions';

import style from './variantColumns.module.scss';

const formatCalls = (calls: number[]) => (calls ? calls.join('/') : TABLE_EMPTY_PLACE_HOLDER);

const formatRqdm = (rqdm: frequency_RQDMEntity) => {
  if (!rqdm?.total?.pc) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return `${rqdm.total.pc} / ${rqdm.total.pn} (${(rqdm.total.pf * 100).toPrecision(3)}%)`;
};

const displayParentalOrigin = (parental_origin: string) =>
  intl.get(`filters.options.donors.parental_origin.${parental_origin}`)
    ? intl.get(`filters.options.donors.parental_origin.${parental_origin}`)
    : removeUnderscoreAndCapitalize(parental_origin || '').defaultMessage(TABLE_EMPTY_PLACE_HOLDER);

export const getAcmgRuleContent = (varsome: Varsome) =>
  varsome && varsome.acmg.classifications.hits.edges.length >= 1
    ? varsome.acmg.classifications.hits.edges
        .map((e: ArrangerEdge<VarsomeClassifications>) => e.node.name)
        .reduce((prev, curr) => `${prev}, ${curr}`)
    : TABLE_EMPTY_PLACE_HOLDER;

const getAcmgCriteriaCol = () => ({
  key: 'acmgcriteria',
  title: intl.get('acmg.criteria'),
  dataIndex: 'varsome',
  className: cx(style.variantTableCell, style.variantTableCellElipsis),
  defaultHidden: true,
  render: (varsome: Varsome) => getAcmgRuleContent(varsome),
});

export const getVariantColumns = (
  patientId?: string,
  drawerCb?: (record: VariantEntity) => void,
  igvModalCb?: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [
    {
      title: intl.get('screen.patientsnv.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: cx(style.fixedVariantTableCellElipsis, style.fixedVariantTableCellElipsis),
      fixed: 'left',
      render: (hgvsg: string, entity: VariantEntity) =>
        hgvsg ? (
          <Tooltip placement="topLeft" title={hgvsg}>
            <div>
              <Link target="_blank" to={`/variant/entity/${entity.locus}/${TAB_ID.SUMMARY}`}>
                {hgvsg}
              </Link>
            </div>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientsnv.results.table.type'),
      dataIndex: 'variant_class',
      render: (variant: string) =>
        variant ? intl.get(variant).defaultMessage(capitalize(variant)) : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rsnumber',
      title: intl.get('screen.patientsnv.results.table.dbsnp'),
      dataIndex: 'rsnumber',
      className: style.dbSnpTableCell,
      render: (rsNumber: string) =>
        rsNumber ? (
          <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}>
            {rsNumber}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'consequences',
      title: intl.get('screen.patientsnv.results.table.consequence'),
      dataIndex: 'consequences',
      width: 300,
      render: (consequences: { hits: { edges: Consequence[] } }) => (
        <ConsequencesCell consequences={consequences?.hits?.edges || []} />
      ),
    },
    {
      key: 'omim',
      title: intl.get('screen.patientsnv.results.table.omim'),
      tooltip: intl.get('screen.patientsnv.results.table.omim.tooltip'),
      render: (variant: { genes: { hits: { edges: Gene[] } } }) => {
        const genesWithOmim = variant.genes.hits.edges.filter(
          (gene) => gene.node.omim?.hits?.edges?.length,
        );

        if (!genesWithOmim.length) {
          return TABLE_EMPTY_PLACE_HOLDER;
        }

        return (
          <ExpandableCell<Gene>
            dataSource={genesWithOmim}
            nOfElementsWhenCollapsed={2}
            dictionnary={{
              'see.less': intl.get('see.less'),
              'see.more': intl.get('see.more'),
            }}
            renderItem={(item, id): React.ReactNode => {
              const omims = item.node.omim?.hits?.edges || [];
              const selectedOmim = omims.length ? omims[0] : null;
              const inheritance = selectedOmim?.node.inheritance_code || [];

              return (
                <Space key={id} align="center" className={style.variantSnvOmimCellItem}>
                  <ExternalLink href={`https://www.omim.org/entry/${item.node.omim_gene_id}`}>
                    {item.node.symbol}
                  </ExternalLink>
                  <Space size={4}>
                    {inheritance.length
                      ? inheritance.map((code) => (
                          <Tooltip key={code} title={intl.get(`inheritant.code.${code}`)}>
                            <Tag color="processing">{code}</Tag>
                          </Tooltip>
                        ))
                      : TABLE_EMPTY_PLACE_HOLDER}
                  </Space>
                </Space>
              );
            }}
          />
        );
      },
    },
    {
      key: 'clinvar',
      title: intl.get('screen.patientsnv.results.table.clinvar'),
      dataIndex: 'clinvar',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (clinVar: ClinVar) =>
        clinVar?.clin_sig && clinVar.clinvar_id ? (
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
          >
            {clinVar.clin_sig.join(', ')}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'acmgVerdict',
      title: intl.get('screen.patientsnv.results.table.acmgVerdict'),
      tooltip: intl.get('screen.patientsnv.results.table.acmgVerdict.tooltip'),
      dataIndex: 'locus',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (locus: string, entity: VariantEntity) => (
        <AcmgVerdict varsome={entity.varsome} locus={locus} />
      ),
    },
    {
      key: 'external_frequencies',
      title: intl.get('screen.variantsearch.table.gnomAd'),
      tooltip: `${intl.get('screen.variantsearch.table.gnomAd.tooltip')}`,
      dataIndex: 'external_frequencies',
      render: (external_frequencies: ExternalFrequenciesEntity) =>
        external_frequencies.gnomad_genomes_2_1_1
          ? external_frequencies.gnomad_genomes_2_1_1.af.toExponential(3)
          : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rqdm',
      title: intl.get('screen.patientsnv.results.table.rqdm'),
      tooltip: intl.get('screen.variantDetails.summaryTab.patientTable.patient.tootltip'),
      className: style.rqdmCell,
      render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM),
    },
  ];

  if (!patientId) {
    columns.push(getAcmgCriteriaCol());
  }

  if (patientId) {
    columns.push(
      {
        key: 'gq',
        title: intl.get('screen.patientsnv.results.table.gq'),
        tooltip: intl.get('gq.tooltip'),
        render: (record: VariantEntity) => (
          <GqLine value={findDonorById(record.donors, patientId)?.gq} />
        ),
      },
      {
        key: 'donors_zygosity',
        title: intl.get('screen.patientsnv.results.table.zygosity'),
        dataIndex: 'donors',
        render: (record: ArrangerResultsTree<DonorsEntity>) => {
          const donor = findDonorById(record, patientId);
          return donor ? donor?.zygosity : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        ...getAcmgCriteriaCol(),
      },
      {
        key: 'donors_genotype',
        title: intl.get('screen.patientsnv.results.table.genotype'),
        dataIndex: 'donors',
        defaultHidden: true,
        render: (record: ArrangerResultsTree<DonorsEntity>) => {
          const donor = findDonorById(record, patientId);
          const motherCalls = formatCalls(donor?.mother_calls!);
          const fatherCalls = formatCalls(donor?.father_calls!);

          return `${motherCalls} : ${fatherCalls}`;
        },
      },
      {
        key: 'ch',
        title: intl.get('screen.patientsnv.results.table.ch'),
        tooltip: intl.get('ch.tooltip'),
        defaultHidden: true,
        render: (record: VariantEntity) => (
          <HcComplementDescription
            hcComplements={findDonorById(record.donors, patientId)?.hc_complement}
            defaultText={TABLE_EMPTY_PLACE_HOLDER}
            wrap={false}
            size={0}
          />
        ),
      },
      {
        key: 'pch',
        title: intl.get('screen.patientsnv.results.table.pch'),
        tooltip: intl.get('pch.tooltip'),
        defaultHidden: true,
        render: (record: VariantEntity) => (
          <HcComplementDescription
            hcComplements={findDonorById(record.donors, patientId)?.possibly_hc_complement}
            defaultText={TABLE_EMPTY_PLACE_HOLDER}
            wrap={false}
            size={0}
          />
        ),
      },
      {
        key: 'transmission',
        title: intl.get('screen.patientsnv.results.table.transmission'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          removeUnderscoreAndCapitalize(
            findDonorById(record.donors, patientId)?.transmission! || '',
          ).defaultMessage(TABLE_EMPTY_PLACE_HOLDER),
      },
      {
        key: 'qd',
        title: intl.get('qd'),
        tooltip: intl.get('qd.tooltip'),
        defaultHidden: true,
        render: (record: VariantEntity) => {
          const donor = findDonorById(record.donors, patientId);
          return donor?.qd ? donor.qd : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        key: 'po',
        title: intl.get('po'),
        tooltip: intl.get('parental.origin'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)
            ? displayParentalOrigin(findDonorById(record.donors, patientId)?.parental_origin!)
            : TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'alt',
        title: intl.get('screen.patientsnv.results.table.altprof'),
        tooltip: intl.get('filters.group.donors.ad_alt'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'alttotal',
        title: intl.get('screen.patientsnv.results.table.alttotal'),
        tooltip: intl.get('total.depth'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'altratio',
        title: intl.get('screen.patientsnv.results.table.altratio'),
        tooltip: intl.get('screen.patientsnv.results.table.altratio.tooltip'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          (findDonorById(record.donors, patientId)?.ad_ratio ?? 0).toFixed(2) ??
          TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'filter',
        title: intl.get('screen.patientsnv.results.table.filter'),
        tooltip: intl.get('screen.variantDetails.patientsTab.filter.tooltip'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.filters ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        className: style.userAffectedBtnCell,
        key: 'actions',
        title: intl.get('screen.patientsnv.results.table.actions'),
        fixed: 'right',
        render: (record: VariantEntity) => (
          <Space align={'center'}>
            <Tooltip title={intl.get('occurrence.patient')}>
              <Button
                type={'link'}
                onClick={() => drawerCb && drawerCb(record)}
                icon={<UserAffectedIcon width={'100%'} height={'16px'} />}
                size={'small'}
              />
            </Tooltip>
            <Tooltip title={intl.get('open.in.igv')}>
              <Button
                onClick={() => igvModalCb && igvModalCb(record)}
                icon={<LineStyleIcon width={'100%'} height={'16px'} />}
                type={'link'}
                size={'small'}
              />
            </Tooltip>
            <OtherActions patientId={patientId} record={record} />
          </Space>
        ),
        align: 'center',
      },
    );
  }

  return columns;
};
