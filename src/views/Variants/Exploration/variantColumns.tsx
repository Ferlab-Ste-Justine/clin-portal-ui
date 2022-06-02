import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Button, Space, Tooltip } from 'antd';
import cx from 'classnames';
import { ArrangerEdge, ArrangerResultsTree } from 'graphql/models';
import {
  ClinVar,
  Consequence,
  DonorsEntity,
  ExternalFrequenciesEntity,
  frequency_RQDMEntity,
  ITableVariantEntity,
  VariantEntity,
  Varsome,
  VarsomeClassifications,
} from 'graphql/variants/models';
import { findDonorById } from 'graphql/variants/selector';
import { capitalize } from 'lodash';
import ConsequencesCell from 'views/Variants/components/ConsequencesCell';

import LineStyleIcon from 'components/icons/LineStyleIcon';
import UserAffectedIcon from 'components/icons/UserAffectedIcon';
import { ReportNames } from 'store/reports/types';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';

import { HcComplementDescription } from '../components/OccurrenceDrawer/HcDescription';
import ReportButton from '../components/Report/DownloadButton';

import AcmgVerdict from './components/AcmgVerdict';

import style from './variantColumns.module.scss';

const formatCalls = (calls: number[]) => (calls ? calls.join('/') : TABLE_EMPTY_PLACE_HOLDER);

const formatRqdm = (rqdm: frequency_RQDMEntity) => {
  if (!rqdm?.total?.pc) {
    return TABLE_EMPTY_PLACE_HOLDER;
  }
  return `${rqdm.total.pc} / ${rqdm.total.pn} (${(rqdm.total.pf * 100).toPrecision(3)}%)`;
};

const getAcmgRuleContent = (varsome: Varsome) =>
  varsome
    ? varsome.acmg.classifications.hits.edges
        .map((e: ArrangerEdge<VarsomeClassifications>) => e.node.name)
        .reduce((prev, curr) => `${prev}, ${curr}`)
    : TABLE_EMPTY_PLACE_HOLDER;

export const getVariantColumns = (
  patientId?: string,
  drawerCb?: (record: VariantEntity) => void,
  igvModalCb?: (record: VariantEntity) => void,
): ProColumnType<ITableVariantEntity>[] => {
  const columns: ProColumnType<ITableVariantEntity>[] = [
    {
      title: intl.get('screen.patientvariant.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (hgvsg: string, entity: VariantEntity) =>
        hgvsg ? (
          <Tooltip placement="topLeft" title={hgvsg}>
            <Link target="_blank" to={`/variant/entity/${entity.locus}`}>
              {hgvsg}
            </Link>
          </Tooltip>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientvariant.results.table.type'),
      dataIndex: 'variant_class',
      render: (variant: string) =>
        variant ? intl.get(variant).defaultMessage(capitalize(variant)) : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rsnumber',
      title: intl.get('screen.patientvariant.results.table.dbsnp'),
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
      title: intl.get('screen.patientvariant.results.table.consequence'),
      dataIndex: 'consequences',
      width: 300,
      render: (consequences: { hits: { edges: Consequence[] } }) => (
        <ConsequencesCell consequences={consequences?.hits?.edges || []} />
      ),
    },
    {
      key: 'clinvar',
      title: intl.get('screen.patientvariant.results.table.clinvar'),
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
      displayTitle: intl.get('screen.patientvariant.results.table.acmgVerdict'),
      title: (
        <Tooltip title={intl.get('screen.patientvariant.results.table.acmgVerdict.tooltip')}>
          {intl.get('screen.patientvariant.results.table.acmgVerdict')}
        </Tooltip>
      ),
      dataIndex: 'rsnumber',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (rsnumber: string, entity: VariantEntity) => {
        const varsome: Varsome | undefined = entity.varsome;
        return (
          <AcmgVerdict
            verdict={varsome?.acmg.verdict.verdict}
            externalId={varsome ? varsome.variant_id : rsnumber}
          />
        );
      },
    },
    {
      key: 'external_frequencies',
      title: (
        <Tooltip title="Gnomad Exomes">{intl.get('screen.variantsearch.table.gnomAd')}</Tooltip>
      ),
      displayTitle: intl.get('screen.variantsearch.table.gnomAd'),
      dataIndex: 'external_frequencies',
      render: (external_frequencies: ExternalFrequenciesEntity) =>
        external_frequencies.gnomad_exomes_2_1_1
          ? external_frequencies.gnomad_exomes_2_1_1.af.toExponential(3)
          : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rqdm',
      displayTitle: intl.get('screen.patientvariant.results.table.rqdm'),
      title: (
        <Tooltip title={intl.get('screen.patientvariant.results.table.rqdm.title.tooltip')}>
          {intl.get('screen.patientvariant.results.table.rqdm')}
        </Tooltip>
      ),
      className: style.rqdmCell,
      render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM),
    },
  ];

  if (!patientId) {
    columns.push({
      key: 'acmgrules',
      title: intl.get('screen.patientvariant.results.table.acmgRules'),
      dataIndex: 'varsome',
      defaultHidden: true,
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      render: (varsome: Varsome) => getAcmgRuleContent(varsome),
    });
  }

  if (patientId) {
    columns.push(
      {
        key: 'donors_zygosity',
        title: intl.get('screen.patientvariant.results.table.zygosity'),
        dataIndex: 'donors',
        render: (record: ArrangerResultsTree<DonorsEntity>) => {
          const donor = findDonorById(record, patientId);
          return donor ? donor?.zygosity : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        className: style.userAffectedBtnCell,
        key: 'actions',
        title: intl.get('screen.patientvariant.results.table.actions'),
        displayTitle: 'Information',
        render: (record: VariantEntity) => (
          <Space align={'center'}>
            <Tooltip title={intl.get('occurrence.patient')}>
              <Button
                type={'text'}
                onClick={() => drawerCb && drawerCb(record)}
                icon={<UserAffectedIcon width={'18px'} height={'18px'} />}
                size={'small'}
              />
            </Tooltip>
            <ReportButton
              patientId={patientId}
              variantId={record.hgvsg}
              name={ReportNames.transcript}
              iconOnly
              icon={<DownloadOutlined />}
              tooltipTitle={intl.get('download.report')}
              size={'small'}
            />
            <Tooltip title={intl.get('open.in.igv')}>
              <Button
                onClick={() => igvModalCb && igvModalCb(record)}
                icon={<LineStyleIcon width={'18px'} height={'18px'} />}
                type={'text'}
                size={'small'}
              />
            </Tooltip>
          </Space>
        ),
        align: 'center',
      },
      {
        key: 'acmgrules',
        title: intl.get('screen.patientvariant.results.table.acmgRules'),
        dataIndex: 'varsome',
        className: cx(style.variantTableCell, style.variantTableCellElipsis),
        defaultHidden: true,
        render: (varsome: Varsome) => getAcmgRuleContent(varsome),
      },
      {
        key: 'donors_genotype',
        title: intl.get('screen.patientvariant.results.table.genotype'),
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
        displayTitle: intl.get('screen.patientvariant.results.table.ch'),
        title: (
          <Tooltip title={intl.get('ch.tooltip')}>
            {intl.get('screen.patientvariant.results.table.ch')}
          </Tooltip>
        ),
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
        displayTitle: intl.get('screen.patientvariant.results.table.pch'),
        title: (
          <Tooltip title={intl.get('pch.tooltip')}>
            {intl.get('screen.patientvariant.results.table.pch')}
          </Tooltip>
        ),
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
        title: intl.get('screen.patientvariant.results.table.transmission'),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          removeUnderscoreAndCapitalize(
            findDonorById(record.donors, patientId)?.transmission! || '',
          ).defaultMessage(TABLE_EMPTY_PLACE_HOLDER),
      },
      {
        key: 'qd',
        displayTitle: intl.get('qd'),
        title: <Tooltip title={intl.get('qd.tooltip')}>{intl.get('qd')}</Tooltip>,
        defaultHidden: true,
        render: (record: VariantEntity) => {
          const donor = findDonorById(record.donors, patientId);
          return donor?.qd ? donor.qd : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        key: 'po',
        displayTitle: intl.get('po'),
        title: <Tooltip title={intl.get('parental.origin')}>{intl.get('po')}</Tooltip>,
        defaultHidden: true,
        render: (record: VariantEntity) => {
          const donor = findDonorById(record.donors, patientId);
          return donor?.parental_origin
            ? capitalize(intl.get(donor?.parental_origin))
            : TABLE_EMPTY_PLACE_HOLDER;
        },
      },
      {
        key: 'alt',
        displayTitle: intl.get('screen.patientvariant.results.table.altprof'),
        title: (
          <Tooltip title={intl.get('filters.group.donors.ad_alt')}>
            {intl.get('screen.patientvariant.results.table.altprof')}
          </Tooltip>
        ),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'alttotal',
        displayTitle: intl.get('screen.patientvariant.results.table.alttotal'),
        title: (
          <Tooltip title={intl.get('total.depth')}>
            {intl.get('screen.patientvariant.results.table.alttotal')}
          </Tooltip>
        ),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'altratio',
        displayTitle: intl.get('screen.patientvariant.results.table.altratio'),
        title: (
          <Tooltip title={intl.get('allelic.ratio')}>
            {intl.get('screen.patientvariant.results.table.altratio')}
          </Tooltip>
        ),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          (findDonorById(record.donors, patientId)?.ad_ratio ?? 0).toFixed(2) ??
          TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'gq',
        displayTitle: intl.get('screen.patientvariant.results.table.gq'),
        title: (
          <Tooltip title={intl.get('gq.tooltip')}>
            {intl.get('screen.patientvariant.results.table.gq')}
          </Tooltip>
        ),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.gq ?? TABLE_EMPTY_PLACE_HOLDER,
      },
      {
        key: 'filter',
        displayTitle: intl.get('screen.patientvariant.results.table.filter'),
        title: (
          <Tooltip title={intl.get('screen.variantDetails.patientsTab.filter.tooltip')}>
            {intl.get('screen.patientvariant.results.table.filter')}
          </Tooltip>
        ),
        defaultHidden: true,
        render: (record: VariantEntity) =>
          findDonorById(record.donors, patientId)?.filters ?? TABLE_EMPTY_PLACE_HOLDER,
      },
    );
  }

  return columns;
};
