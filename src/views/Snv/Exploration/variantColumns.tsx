import React from 'react';
import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { FireFilled, FireOutlined, PlusOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import cx from 'classnames';
import { INDEXES } from 'graphql/constants';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';
import {
  BioinfoAnalysisCode,
  ClinVar,
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
import { VariantType } from 'views/Prescriptions/Entity/context';
import ConsequencesCell from 'views/Snv/components/ConsequencesCell';

import ExternalLinkIcon from 'components/icons/ExternalLinkIcon';
import LineStyleIcon from 'components/icons/LineStyleIcon';
import UserAffectedIcon from 'components/icons/UserAffectedIcon';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import { formatFilters } from 'utils/formatFilters';
import { formatGenotype } from 'utils/formatGenotype';

import GqLine from '../components/GQLine';
import { HcComplementDescription } from '../components/OccurrenceDrawer/HcDescription';
import { TAB_ID } from '../Entity';

import AcmgVerdict from './components/AcmgVerdict';
import GnomadCell from './components/Gnomad/GnomadCell';
import { OtherActions } from './components/OtherActions';

import style from './variantColumns.module.scss';

const ClinvarColorMap: Record<any, string> = {
  affects: 'default',
  association: 'default',
  association_not_found: 'default',
  benign: 'green',
  confers_sensitivity: 'default',
  conflicting_interpretations_of_pathogenicity: 'orange',
  drug_response: 'default',
  likely_benign: 'lime',
  likely_pathogenic: 'volcano',
  likely_risk_allele: 'default',
  low_penetrance: 'default',
  not_provided: 'default',
  other: 'default',
  pathogenic: 'red',
  protective: 'default',
  risk_factor: 'default',
  uncertain_risk_allele: 'default',
  uncertain_significance: 'orange',
};

const ACMGExoColorMap: Record<any, string> = {
  BENIGN: 'green',
  LIKELY_BENIGN: 'lime',
  UNCERTAIN_SIGNIFICANCE: 'orange',
  PATHOGENIC: 'red',
  LIKELY_PATHOGENIC: 'volcano',
};

const CmcTierColorMap: Record<any, string> = {
  1: 'red',
  2: 'volcano',
  3: 'orange',
  Other: 'default',
};

const formatRqdm = (rqdm: frequency_RQDMEntity, variant: VariantEntity) => {
  if (!rqdm?.total?.pc) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return (
    <Space size={4}>
      <Link to={`/variant/entity/${variant.locus}/${TAB_ID.PATIENTS}`}>{rqdm.total.pc}</Link>
      <Typography.Text>({rqdm.total.pf.toExponential(2)})</Typography.Text>
    </Space>
  );
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

const getDonorQd = (patientId: string) => ({
  key: 'donors.qd',
  title: intl.get('qd'),
  tooltip: intl.get('qd.tooltip'),
  defaultHidden: true,
  width: 180,
  render: (record: VariantEntity) =>
    renderDonorByKey('donors.qd', findDonorById(record.donors, patientId)),
});

const getDonorZygosity = (patientId: string) => ({
  key: 'donors.zygosity',
  title: intl.get('screen.patientsnv.results.table.zygosity'),
  tooltip: intl.get('donor.zygosity.tooltip'),
  dataIndex: 'donors',
  width: 100,
  sorter: {
    multiple: 1,
  },
  render: (record: ArrangerResultsTree<DonorsEntity>) => {
    const zyg = renderDonorByKey('donors.zygosity', findDonorById(record, patientId)) as string;

    return (
      <Tooltip title={intl.get(`donors.zyg.abrv.${zyg}`)}>
        <Tag color="blue">{capitalize(zyg)}</Tag>
      </Tooltip>
    );
  },
});

const getAcmgCriteriaCol = () => ({
  key: 'acmgcriteria',
  title: intl.get('acmg.criteria'),
  dataIndex: 'varsome',
  className: cx(style.variantTableCell, style.variantTableCellElipsis),
  defaultHidden: true,
  width: 120,
  render: (varsome: Varsome) => getAcmgRuleContent(varsome),
});

const getCmcSampleMutatedCol = (variantType: VariantType, patientId?: string) => ({
  key: 'cmc.sample_mutated',
  title: intl.get('screen.patientsnv.results.table.cmc'),
  tooltip: intl.get('screen.patientsnv.results.table.cmc.tooltip'),
  width: 150,
  defaultHidden: patientId && variantType !== VariantType.SOMATIC_TUMOR_ONLY ? true : false,
  sorter: {
    multiple: 1,
  },
  render: (record: VariantEntity) =>
    record.cmc ? (
      <Space size={4}>
        <a href={record.cmc.mutation_url} target="_blank" rel="noreferrer">
          {record.cmc.sample_mutated}
        </a>
        <Typography.Text>({record.cmc.sample_ratio.toExponential(2)})</Typography.Text>
      </Space>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
});

const getHotspotCol = () => ({
  key: 'hotspot',
  title: intl.get('screen.variantsearch.table.hotspot'),
  tooltip: `${intl.get('screen.variantsearch.table.hotspot.tooltip')}`,
  iconTitle: <FireOutlined />,
  sorter: {
    multiple: 1,
  },
  width: 50,
  render: (record: VariantEntity) => {
    if (record.hotspot === true) {
      return <FireFilled className={style.hotspotFilled} />;
    } else if (record.hotspot === false) {
      return <FireOutlined className={style.hotspotOutlined} />;
    }
    return TABLE_EMPTY_PLACE_HOLDER;
  },
});

export const getVariantColumns = (
  queryBuilderId: string,
  variantType: VariantType,
  patientId?: string,
  drawerCb?: (record: VariantEntity) => void,
  igvModalCb?: (record: VariantEntity) => void,
  onlyExportTSV: boolean = false,
): ProColumnType<ITableVariantEntity>[] => {
  let columns: ProColumnType<ITableVariantEntity>[] = [];

  if (patientId) {
    columns.push({
      className: style.userAffectedBtnCell,
      key: 'actions',
      title: intl.get('screen.patientsnv.results.table.actions'),
      fixed: 'left',
      render: (record: VariantEntity) => (
        <Space align={'center'}>
          <Tooltip title={intl.get('occurrence.patient')}>
            <Button
              type={'link'}
              onClick={() => drawerCb && drawerCb(record)}
              icon={<UserAffectedIcon width={'100%'} height={'16px'} />}
              size={'small'}
              data-cy={`drawerCb_${record.hgvsg}`}
            />
          </Tooltip>
          <Tooltip title={intl.get('open.in.igv')}>
            <Button
              onClick={() => igvModalCb && igvModalCb(record)}
              icon={<LineStyleIcon width={'100%'} height={'16px'} />}
              type={'link'}
              size={'small'}
              data-cy={`igvModalCb_${record.hgvsg}`}
            />
          </Tooltip>
          <OtherActions patientId={patientId} record={record} />
        </Space>
      ),
      align: 'center',
      width: 102,
    });
  }

  columns = [
    ...columns,
    {
      title: intl.get('screen.patientsnv.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: style.fixedVariantTableCellElipsis,
      fixed: 'left',
      sorter: {
        multiple: 1,
      },
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
      width: 100,
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientsnv.results.table.type'),
      dataIndex: 'variant_class',
      sorter: {
        multiple: 1,
      },
      width: 65,
      render: (variant: string) =>
        variant ? (
          <Tooltip
            title={intl
              .get(`type.abrv.${variant.toLowerCase()}.tooltip`)
              .defaultMessage(capitalize(variant))}
          >
            {intl.get(`type.abrv.${variant.toLowerCase()}`).defaultMessage(capitalize(variant))}
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
  ];

  if (patientId && variantType === VariantType.SOMATIC_TUMOR_ONLY) {
    columns.push({
      key: 'donors.bioinfo_analysis_code',
      title: intl.get('screen.patientsnv.results.table.bioinfo_analysis_code'),
      tooltip: intl.get('bioinfo_analysis_code.tooltip'),
      width: 59,
      render: (record: VariantEntity) =>
        renderDonorByKey('donors.bioinfo_analysis_code', findDonorById(record.donors, patientId)),
    });
  }

  columns.push(
    {
      key: 'rsnumber',
      title: intl.get('screen.patientsnv.results.table.dbsnp'),
      dataIndex: 'rsnumber',
      className: style.dbSnpTableCell,
      width: 60,
      render: (rsNumber: string) =>
        rsNumber ? (
          <ExternalLink href={`https://www.ncbi.nlm.nih.gov/snp/${rsNumber}`}>
            <ExternalLinkIcon />
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      title: intl.get('screen.patientsnv.results.table.gene'),
      key: 'gene',
      dataIndex: 'consequences',
      width: 100,
      sorter: {
        multiple: 1,
      },
      render: (consequences: VariantEntity['consequences']) => {
        const pickedConsequence = consequences?.hits?.edges.find(({ node }) => !!node.picked);
        const geneSymbol = pickedConsequence?.node.symbol;

        if (geneSymbol) {
          return (
            <Space size={4} direction="horizontal" className={style.addGene}>
              <ExternalLink
                hasIcon={false}
                href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${geneSymbol}`}
              >
                {geneSymbol}
              </ExternalLink>
              <div
                className={style.addGeneButton}
                onClick={() => {
                  addQuery({
                    queryBuilderId,
                    query: generateQuery({
                      newFilters: [
                        generateValueFilter({
                          field: 'consequences.symbol',
                          value: [geneSymbol],
                          index: INDEXES.VARIANT,
                        }),
                      ],
                    }),
                    setAsActive: true,
                  });
                }}
              >
                <PlusOutlined />
              </div>
            </Space>
          );
        } else {
          return TABLE_EMPTY_PLACE_HOLDER;
        }
      },
    },
    {
      key: 'consequence',
      title: intl.get('screen.patientsnv.results.table.consequence'),
      dataIndex: 'consequences',
      width: 225,
      render: (consequences: VariantEntity['consequences']) => {
        const pickedConsequence = consequences?.hits?.edges.find(({ node }) => !!node.picked);
        return <ConsequencesCell consequences={pickedConsequence ? [pickedConsequence] : []} />;
      },
    },
    {
      key: 'omim',
      title: intl.get('screen.patientsnv.results.table.omim'),
      tooltip: intl.get('screen.patientsnv.results.table.omim.tooltip'),
      width: 125,
      render: (variant: {
        genes: { hits: { edges: Gene[] } };
        consequences: VariantEntity['consequences'];
      }) => {
        const pickedConsequenceSymbol = variant.consequences?.hits.edges.find(
          ({ node }) => !!node.picked,
        )?.node.symbol;

        return renderOmim(variant, pickedConsequenceSymbol);
      },
    },
    {
      key: 'clinvar',
      title: intl.get('screen.patientsnv.results.table.clinvar'),
      dataIndex: 'clinvar',
      className: style.variantTableCell,
      width: 160,
      render: renderClinvar,
    },
  );

  if (patientId) {
    columns.push(
      {
        key: 'donors.exomiser.gene_combined_score',
        title: intl.get('screen.patientsnv.results.table.gene_combined_score'),
        tooltip: intl.get('screen.patientsnv.results.table.gene_combined_score.tooltip'),
        width: 59,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey(
            'donors.exomiser.gene_combined_score',
            findDonorById(record.donors, patientId),
          ),
      },
      {
        key: 'donors.exomiser.acmg_classification',
        title: intl.get('screen.patientsnv.results.table.acmg_classification'),
        tooltip: intl.get('screen.patientsnv.results.table.acmg_classification.tooltip'),
        width: 110,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderAcmgExo(findDonorById(record.donors, patientId)?.exomiser?.acmg_classification),
      },
    );
  }
  columns.push(
    {
      key: 'acmgVerdict',
      title: intl.get('screen.patientsnv.results.table.acmgVerdict'),
      tooltip: intl.get('screen.patientsnv.results.table.acmgVerdict.tooltip'),
      dataIndex: 'locus',
      className: cx(style.variantTableCell),
      width: 125,
      render: (locus: string, entity: VariantEntity) => (
        <AcmgVerdict varsome={entity.varsome} locus={locus} />
      ),
    },
    {
      key: 'external_frequencies.gnomad_genomes_3_1_1.af',
      title: intl.get('screen.variantsearch.table.gnomAd'),
      tooltip: `${intl.get('screen.variantsearch.table.gnomAd.tooltip')}`,
      dataIndex: 'external_frequencies',
      sorter: {
        multiple: 1,
      },
      width: 98,
      render: (external_frequencies: ExternalFrequenciesEntity) => {
        const af = external_frequencies.gnomad_genomes_3_1_1?.af;

        if (!af) return TABLE_EMPTY_PLACE_HOLDER;

        return (
          <Space direction="horizontal">
            <GnomadCell underOnePercent={af < 0.01} />
            <span>{af.toExponential(2)}</span>
          </Space>
        );
      },
    },
    {
      key: 'frequency_RQDM.total.pf',
      title: intl.get('screen.patientsnv.results.table.rqdm'),
      tooltip: intl.get('screen.variantDetails.summaryTab.patientTable.patient.tootltip'),
      className: style.rqdmCell,
      sorter: {
        multiple: 1,
      },
      width: 110,
      render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM, record),
    },
  );

  if (onlyExportTSV) {
    columns.push({
      key: 'frequency_RQDM.total.pc',
      title: intl.get('screen.patientsnv.results.table.rqdm'),
      defaultHidden: true,
    });
  }

  if (patientId) {
    if (variantType === VariantType.GERMLINE) {
      columns.push(
        {
          key: 'donors.gq',
          title: intl.get('screen.patientsnv.results.table.gq'),
          tooltip: intl.get('gq.tooltip'),
          width: 59,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.gq', findDonorById(record.donors, patientId)),
        },
        {
          ...getDonorZygosity(patientId),
        },
        {
          ...getAcmgCriteriaCol(),
        },
        {
          key: 'donors_genotype',
          title: intl.get('screen.patientsnv.results.table.genotype'),
          dataIndex: 'donors',
          defaultHidden: true,
          width: 150,
          render: (record: ArrangerResultsTree<DonorsEntity>) =>
            renderDonorByKey('donors_genotype', findDonorById(record, patientId)),
        },
        {
          key: 'ch',
          title: intl.get('screen.patientsnv.results.table.ch'),
          tooltip: intl.get('ch.tooltip'),
          defaultHidden: true,
          width: 200,
          render: (record: VariantEntity) => {
            const donor = findDonorById(record.donors, patientId);
            return (
              <HcComplementDescription
                hcComplements={donor?.hc_complement}
                defaultText={TABLE_EMPTY_PLACE_HOLDER}
                wrap={false}
                size={0}
                locus={record.locus}
              />
            );
          },
        },
        {
          key: 'pch',
          title: intl.get('screen.patientsnv.results.table.pch'),
          tooltip: intl.get('pch.tooltip'),
          defaultHidden: true,
          width: 220,
          render: (record: VariantEntity) =>
            renderDonorByKey('pch', findDonorById(record.donors, patientId)),
        },
        {
          key: 'donors.transmission',
          title: intl.get('screen.patientsnv.results.table.transmission'),
          defaultHidden: true,
          width: 200,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.transmission', findDonorById(record.donors, patientId)),
        },
        {
          ...getDonorQd(patientId),
          sorter: {
            multiple: 1,
          },
        },
        {
          key: 'donors.parental_origin',
          title: intl.get('po'),
          tooltip: intl.get('parental.origin'),
          defaultHidden: true,
          width: 180,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.parental_origin', findDonorById(record.donors, patientId)),
        },
      );
    } else if (variantType === VariantType.SOMATIC_TUMOR_ONLY) {
      columns.push({ ...getCmcSampleMutatedCol(variantType, patientId) });
      if (onlyExportTSV) {
        columns.push({
          key: 'cmc.sample_ratio',
          title: intl.get('screen.patientsnv.results.table.cmc'),
          defaultHidden: true,
        });
      }
      columns.push(
        {
          ...getHotspotCol(),
        },
        {
          key: 'donors.sq',
          title: intl.get('screen.patientsnv.results.table.sq'),
          tooltip: intl.get('sq.tooltip'),
          width: 59,
          sorter: {
            multiple: 1,
          },
          render: (record: VariantEntity) =>
            renderDonorByKey('donors.sq', findDonorById(record.donors, patientId)),
        },
        {
          ...getDonorZygosity(patientId),
          sorter: {
            multiple: 1,
          },
        },
        {
          ...getAcmgCriteriaCol(),
        },
        {
          ...getDonorQd(patientId),
          sorter: {
            multiple: 1,
          },
        },
      );
    }

    columns.push(
      {
        key: 'donors.ad_alt',
        title: intl.get('screen.patientsnv.results.table.altprof'),
        tooltip: intl.get('filters.group.donors.ad_alt'),
        defaultHidden: true,
        width: 120,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.ad_alt', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.ad_total',
        title: intl.get('screen.patientsnv.results.table.alttotal'),
        tooltip: intl.get('total.depth'),
        defaultHidden: true,
        width: 120,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.ad_total', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.ad_ratio',
        title: intl.get('screen.patientsnv.results.table.altratio'),
        tooltip: intl.get('screen.patientsnv.results.table.altratio.tooltip'),
        defaultHidden: true,
        width: 120,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.ad_ratio', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.filters',
        title: intl.get('screen.patientsnv.results.table.filter'),
        tooltip: intl.get('screen.variantDetails.patientsTab.filter.tooltip'),
        defaultHidden: true,
        width: 160,
        sorter: {
          multiple: 1,
        },
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.filters', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.exomiser.acmg_evidence',
        title: intl.get('screen.patientsnv.results.table.acmg_evidence'),
        tooltip: intl.get('screen.patientsnv.results.table.acmg_evidence.tooltip'),
        width: 150,
        defaultHidden: true,
        render: (record: VariantEntity) =>
          renderDonorByKey(
            'donors.exomiser.acmg_evidence',
            findDonorById(record.donors, patientId),
          ),
      },
    );
  }

  if (variantType !== VariantType.SOMATIC_TUMOR_ONLY) {
    columns.push({ ...getCmcSampleMutatedCol(variantType, patientId) });
    if (onlyExportTSV) {
      columns.push({
        key: 'cmc.sample_ratio',
        title: intl.get('screen.patientsnv.results.table.cmc'),
        defaultHidden: true,
      });
    }
    if (!patientId) {
      columns.push({
        ...getHotspotCol(),
      });
    }
  }

  if (!patientId) {
    columns.push(getAcmgCriteriaCol());
  }

  columns.push({
    key: 'cmc.tier',
    title: intl.get('screen.patientsnv.results.table.cmc_tier'),
    tooltip: intl.get('screen.patientsnv.results.table.cmc_tier.tooltip'),
    width: 150,
    defaultHidden: true,
    sorter: {
      multiple: 1,
    },
    render: (record: VariantEntity) =>
      record.cmc?.tier ? (
        <Tag color={CmcTierColorMap[record.cmc.tier]}>
          {intl.get(`filters.options.cmc.tier.${record.cmc.tier}`)}
        </Tag>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  });
  return columns;
};

const renderClinvar = (clinVar: ClinVar) => {
  const clinVarSigKey: string[] = [];

  clinVar?.clin_sig &&
    clinVar.clin_sig.map((c) => {
      clinVarSigKey.push(c.toLowerCase());
    });

  return clinVar?.clin_sig && clinVar.clinvar_id
    ? clinVarSigKey.map((clinvarKey) => (
        <Tooltip
          key={clinvarKey}
          placement="topLeft"
          title={removeUnderscoreAndCapitalize(clinvarKey)}
        >
          <Tag color={ClinvarColorMap[clinvarKey]}>
            <ExternalLink
              href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
            >
              {intl.get(`clinvar.abrv.${clinvarKey}`)}
            </ExternalLink>
          </Tag>
        </Tooltip>
      ))
    : TABLE_EMPTY_PLACE_HOLDER;
};

const renderAcmgExo = (acmg?: string) =>
  acmg ? (
    <Tooltip key={acmg} placement="topLeft" title={intl.get(`acmg.exomiser.${acmg.toLowerCase()}`)}>
      <Tag color={ACMGExoColorMap[acmg]}>
        {intl.get(`acmg.exomiser.abrv.${acmg.toLowerCase()}`)}
      </Tag>
    </Tooltip>
  ) : (
    TABLE_EMPTY_PLACE_HOLDER
  );

const renderToString = (element: any) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  } else if (element) {
    return ReactDOMServer.renderToString(element);
  }
  return '';
};

export const renderOmimToString = (variant: any) => {
  const pickedConsequenceSymbol = variant.consequences?.hits.edges.find(
    ({ node }: any) => !!node.picked,
  )?.node.symbol;

  return renderToString(renderOmim(variant, pickedConsequenceSymbol));
};

export const renderClinvarToString = (variant: any) => {
  const clinvarList = renderClinvar(variant.clinvar);
  const clinvarStringList = [];
  for (let i = 0; i < clinvarList.length; i++) {
    clinvarStringList.push(renderToString(clinvarList[i]));
  }
  return clinvarStringList.join(',');
};
export const renderGeneToString = (variant: any) => {
  const genes = variant.genes?.hits.edges;

  if (genes?.length && genes[0].node.symbol) {
    return genes[0].node.symbol;
  }

  return TABLE_EMPTY_PLACE_HOLDER;
};

export const renderHotspotToString = (variant: any) => {
  const hotspot = variant.hotspot;
  if (hotspot === null) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return hotspot.toString();
};

export const renderDonorToString = (key: string, donor?: DonorsEntity) =>
  renderToString(renderDonorByKey(key, donor));

const getBioinfoTagColor = (code: BioinfoAnalysisCode) => {
  switch (code) {
    case BioinfoAnalysisCode.TEBA:
      return 'blue';
    case BioinfoAnalysisCode.TNBA:
      return 'red';
    default:
      return 'default';
  }
};

// eslint-disable-next-line complexity
const renderDonorByKey = (key: string, donor?: DonorsEntity) => {
  if (key === 'donors.gq') {
    return <GqLine value={donor?.gq} />;
  } else if (key === 'donors.sq') {
    return donor ? donor?.sq : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.bioinfo_analysis_code') {
    const code = donor?.bioinfo_analysis_code;
    return code ? (
      <Tooltip
        title={intl
          .get(`type.abrv.bioinfo_analysis_code.${code}.tooltip`)
          .defaultMessage(capitalize(code))}
      >
        <Tag color={getBioinfoTagColor(code)}>
          {intl.get(`type.abrv.bioinfo_analysis_code.${code}`).defaultMessage(capitalize(code))}
        </Tag>
      </Tooltip>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    );
  } else if (key === 'donors.exomiser.gene_combined_score') {
    return donor?.exomiser?.gene_combined_score || TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.exomiser.acmg_evidence') {
    return (donor?.exomiser?.acmg_evidence || TABLE_EMPTY_PLACE_HOLDER)?.replaceAll(',', ', ');
  } else if (key === 'donors.exomiser.acmg_classification') {
    return removeUnderscoreAndCapitalize(
      donor?.exomiser?.acmg_classification.toLowerCase() || '',
    ).defaultMessage(TABLE_EMPTY_PLACE_HOLDER);
  } else if (key === 'donors.zygosity') {
    return donor ? donor?.zygosity : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors_genotype') {
    const motherCalls = formatGenotype(donor?.mother_calls!);
    const fatherCalls = formatGenotype(donor?.father_calls!);
    return `${motherCalls} : ${fatherCalls}`;
  } else if (key === 'ch') {
    return (
      <HcComplementDescription
        hcComplements={donor?.hc_complement}
        defaultText={TABLE_EMPTY_PLACE_HOLDER}
        wrap={false}
        size={0}
      />
    );
  } else if (key === 'pch') {
    return (
      <HcComplementDescription
        hcComplements={donor?.possibly_hc_complement}
        defaultText={TABLE_EMPTY_PLACE_HOLDER}
        wrap={false}
        size={0}
      />
    );
  } else if (key === 'donors.transmission') {
    return removeUnderscoreAndCapitalize(donor?.transmission! || '').defaultMessage(
      TABLE_EMPTY_PLACE_HOLDER,
    );
  } else if (key === 'donors.qd') {
    return donor?.qd ? donor.qd : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.parental_origin') {
    return donor ? displayParentalOrigin(donor?.parental_origin!) : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.ad_alt') {
    return donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.ad_total') {
    return donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.ad_ratio') {
    return (donor?.ad_ratio ?? 0).toFixed(2) ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'donors.filters') {
    return formatFilters(donor?.filters);
  }
  return <></>;
};

const renderOmim = (
  variant: {
    genes: { hits: { edges: Gene[] } };
  },
  pickedConsequenceSymbol: string | undefined,
) => {
  const genesWithOmim = variant.genes.hits.edges.filter(
    (gene) => gene.node.omim?.hits?.edges?.length,
  );

  const pickedConsequenceGeneWithOmim = genesWithOmim.filter(
    ({ node }) => node.symbol === pickedConsequenceSymbol,
  );

  if (!genesWithOmim.length || !pickedConsequenceGeneWithOmim.length) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }

  const pickedOmim = pickedConsequenceGeneWithOmim[0];
  const omimLink = `https://www.omim.org/entry/${pickedOmim.node.omim_gene_id}`;

  const omims = pickedOmim.node.omim?.hits?.edges || [];
  const inheritance = omims
    .reduce<string[]>((prev, curr) => [...prev, ...(curr.node.inheritance_code || [])], [])
    .filter((item, pos, self) => self.indexOf(item) == pos);

  if (!inheritance.length) {
    return (
      <Tooltip title={intl.get(`inheritant.code.NRT`)}>
        <ExternalLink href={omimLink}>NRT</ExternalLink>
      </Tooltip>
    );
  }

  return (
    <StackLayout horizontal>
      <Space size={4} className={style.variantSnvOmimCellItem}>
        {inheritance.length
          ? inheritance.map((code) => (
              <Tooltip key={code} title={intl.get(`inheritant.code.${code}`)}>
                <Tag color="processing">
                  <ExternalLink href={omimLink}>{code}</ExternalLink>
                </Tag>
              </Tooltip>
            ))
          : TABLE_EMPTY_PLACE_HOLDER}
      </Space>
    </StackLayout>
  );
};

/* {
      key: 'gene.pli',
      title: intl.get('screen.patientsnv.results.table.pli'),
      tooltip: `${intl.get('screen.patientsnv.results.table.pli.tooltip')}`,
      defaultHidden: true,
      width: 150,
      render: (variant: { genes: { hits: { edges: Gene[] } } }) => {
        const genesWithPli = variant.genes.hits.edges.filter((gene: Gene) => gene.node.gnomad);
        return genesWithPli.length ? (
          <ExpandableCell<Gene>
            dataSource={genesWithPli}
            nOfElementsWhenCollapsed={2}
            dictionnary={{
              'see.less': intl.get('see.less'),
              'see.more': intl.get('see.more'),
            }}
            renderItem={(item, id): React.ReactNode => (
              <StackLayout horizontal>
                <Space key={id} align="center" className={style.variantSnvOmimCellItem}>
                  <>
                    {genesWithPli.length > 1 && <div>{`${item.node.symbol} : `}</div>}
                    <ExternalLink
                      href={`https://gnomad.broadinstitute.org/gene/${item.node.ensembl_gene_id}?dataset=gnomad_r2_1`}
                    >
                      {item.node.gnomad.pli.toFixed(2)}
                    </ExternalLink>
                  </>
                </Space>
              </StackLayout>
            )}
          />
        ) : (
          'ND'
        );
      },
    },
    {
      key: 'gene.loeuf',
      title: intl.get('screen.patientsnv.results.table.loeuf'),
      tooltip: `${intl.get('screen.patientsnv.results.table.loeuf.tooltip')}`,
      defaultHidden: true,
      width: 150,
      render: (variant: { genes: { hits: { edges: Gene[] } } }) => {
        const genesWithloeuf = variant.genes.hits.edges.filter((gene: Gene) => gene.node.gnomad);
        return genesWithloeuf.length ? (
          <ExpandableCell<Gene>
            dataSource={genesWithloeuf}
            nOfElementsWhenCollapsed={2}
            dictionnary={{
              'see.less': intl.get('see.less'),
              'see.more': intl.get('see.more'),
            }}
            renderItem={(item, id): React.ReactNode => (
              <StackLayout horizontal>
                <Space key={id} align="center" className={style.variantSnvOmimCellItem}>
                  <>
                    {genesWithloeuf.length > 1 && <div>{`${item.node.symbol} : `}</div>}
                    <ExternalLink
                      href={`https://gnomad.broadinstitute.org/gene/${item.node.ensembl_gene_id}?dataset=gnomad_r2_1`}
                    >
                      {item.node.gnomad.loeuf.toFixed(2)}
                    </ExternalLink>
                  </>
                </Space>
              </StackLayout>
            )}
          />
        ) : (
          'ND'
        );
      },
    }, */
