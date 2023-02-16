import React from 'react';
import ReactDOMServer from 'react-dom/server';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
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
import { formatGenotype } from 'utils/formatGenotype';

import GqLine from '../components/GQLine';
import { HcComplementDescription } from '../components/OccurrenceDrawer/HcDescription';
import { TAB_ID } from '../Entity';

import AcmgVerdict from './components/AcmgVerdict';
import { OtherActions } from './components/OtherActions';

import style from './variantColumns.module.scss';

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
  width: 120,
  render: (varsome: Varsome) => getAcmgRuleContent(varsome),
});

export const getVariantColumns = (
  patientId?: string,
  drawerCb?: (record: VariantEntity) => void,
  igvModalCb?: (record: VariantEntity) => void,
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
          <OtherActions patientId={'test'} record={record} />
        </Space>
      ),
      align: 'center',
      width: 104,
    });
  }

  columns = [
    ...columns,
    {
      title: intl.get('screen.patientsnv.results.table.variant'),
      key: 'hgvsg',
      dataIndex: 'hgvsg',
      className: cx(style.fixedVariantTableCellElipsis, style.fixedVariantTableCellElipsis),
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
      width: 210,
    },
    {
      key: 'variant_class',
      title: intl.get('screen.patientsnv.results.table.type'),
      dataIndex: 'variant_class',
      sorter: {
        multiple: 1,
      },
      width: 96,
      render: (variant: string) =>
        variant ? intl.get(variant).defaultMessage(capitalize(variant)) : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'rsnumber',
      title: intl.get('screen.patientsnv.results.table.dbsnp'),
      dataIndex: 'rsnumber',
      className: style.dbSnpTableCell,
      sorter: {
        multiple: 1,
      },
      width: 109,
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
      width: 284,
      render: (consequences: { hits: { edges: Consequence[] } }) => (
        <ConsequencesCell consequences={consequences?.hits?.edges || []} />
      ),
    },
    {
      key: 'omim',
      title: intl.get('screen.patientsnv.results.table.omim'),
      tooltip: intl.get('screen.patientsnv.results.table.omim.tooltip'),
      width: 175,
      render: (variant: { genes: { hits: { edges: Gene[] } } }) => renderOmim(variant),
    },
    {
      key: 'clinvar',
      title: intl.get('screen.patientsnv.results.table.clinvar'),
      dataIndex: 'clinvar',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      width: 110,
      render: (clinVar: ClinVar) => {
        const clinVarSigFormatted: string[] = [];
        clinVar?.clin_sig &&
          clinVar.clin_sig.map((c) => {
            clinVarSigFormatted.push(removeUnderscoreAndCapitalize(c));
          });
        return clinVar?.clin_sig && clinVar.clinvar_id ? (
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinVar.clinvar_id}`}
          >
            {clinVarSigFormatted.join(', ')}
          </ExternalLink>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        );
      },
    },
    {
      key: 'acmgVerdict',
      title: intl.get('screen.patientsnv.results.table.acmgVerdict'),
      tooltip: intl.get('screen.patientsnv.results.table.acmgVerdict.tooltip'),
      dataIndex: 'locus',
      className: cx(style.variantTableCell, style.variantTableCellElipsis),
      width: 125,
      render: (locus: string, entity: VariantEntity) => (
        <AcmgVerdict varsome={entity.varsome} locus={locus} />
      ),
    },
    {
      key: 'external_frequencies.gnomad_genomes_2_1_1.af',
      title: intl.get('screen.variantsearch.table.gnomAd'),
      tooltip: `${intl.get('screen.variantsearch.table.gnomAd.tooltip')}`,
      dataIndex: 'external_frequencies',
      sorter: {
        multiple: 1,
      },
      width: 98,
      render: (external_frequencies: ExternalFrequenciesEntity) =>
        external_frequencies.gnomad_genomes_2_1_1
          ? external_frequencies.gnomad_genomes_2_1_1.af.toExponential(3)
          : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'frequency_RQDM.total.pf',
      title: intl.get('screen.patientsnv.results.table.rqdm'),
      tooltip: intl.get('screen.variantDetails.summaryTab.patientTable.patient.tootltip'),
      className: style.rqdmCell,
      sorter: {
        multiple: 1,
      },
      width: 100,
      render: (record: VariantEntity) => formatRqdm(record.frequency_RQDM),
    },
  ];

  if (!patientId) {
    columns.push(getAcmgCriteriaCol());
  }

  if (patientId) {
    columns.push(
      {
        key: 'donors.gq',
        title: intl.get('screen.patientsnv.results.table.gq'),
        tooltip: intl.get('gq.tooltip'),
        width: 59,
        render: (record: VariantEntity) =>
          renderDonorByKey('donors.gq', findDonorById(record.donors, patientId)),
      },
      {
        key: 'donors.zygosity',
        title: intl.get('screen.patientsnv.results.table.zygosity'),
        dataIndex: 'donors',
        width: 65,
        render: (record: ArrangerResultsTree<DonorsEntity>) =>
          renderDonorByKey('donors.zygosity', findDonorById(record, patientId)),
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
        render: (record: VariantEntity) =>
          renderDonorByKey('ch', findDonorById(record.donors, patientId)),
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
        key: 'transmission',
        title: intl.get('screen.patientsnv.results.table.transmission'),
        defaultHidden: true,
        width: 200,
        render: (record: VariantEntity) =>
          renderDonorByKey('transmission', findDonorById(record.donors, patientId)),
      },
      {
        key: 'qd',
        title: intl.get('qd'),
        tooltip: intl.get('qd.tooltip'),
        defaultHidden: true,
        width: 180,
        render: (record: VariantEntity) =>
          renderDonorByKey('qd', findDonorById(record.donors, patientId)),
      },
      {
        key: 'po',
        title: intl.get('po'),
        tooltip: intl.get('parental.origin'),
        defaultHidden: true,
        width: 180,
        render: (record: VariantEntity) =>
          renderDonorByKey('po', findDonorById(record.donors, patientId)),
      },
      {
        key: 'alt',
        title: intl.get('screen.patientsnv.results.table.altprof'),
        tooltip: intl.get('filters.group.donors.ad_alt'),
        defaultHidden: true,
        width: 120,
        render: (record: VariantEntity) =>
          renderDonorByKey('alt', findDonorById(record.donors, patientId)),
      },
      {
        key: 'alttotal',
        title: intl.get('screen.patientsnv.results.table.alttotal'),
        tooltip: intl.get('total.depth'),
        defaultHidden: true,
        width: 120,
        render: (record: VariantEntity) =>
          renderDonorByKey('alttotal', findDonorById(record.donors, patientId)),
      },
      {
        key: 'altratio',
        title: intl.get('screen.patientsnv.results.table.altratio'),
        tooltip: intl.get('screen.patientsnv.results.table.altratio.tooltip'),
        defaultHidden: true,
        width: 120,
        render: (record: VariantEntity) =>
          renderDonorByKey('altratio', findDonorById(record.donors, patientId)),
      },
      {
        key: 'filter',
        title: intl.get('screen.patientsnv.results.table.filter'),
        tooltip: intl.get('screen.variantDetails.patientsTab.filter.tooltip'),
        defaultHidden: true,
        width: 160,
        render: (record: VariantEntity) =>
          renderDonorByKey('filter', findDonorById(record.donors, patientId)),
      },
    );
  }

  return columns;
};

const renderToString = (element: any) => {
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  } else if (element) {
    return ReactDOMServer.renderToString(element);
  }
  return '';
};

export const renderOmimToString = (variant: any) => renderToString(renderOmim(variant));

export const renderDonorToString = (key: string, donor?: DonorsEntity) =>
  renderToString(renderDonorByKey(key, donor));

// eslint-disable-next-line complexity
const renderDonorByKey = (key: string, donor?: DonorsEntity) => {
  if (key === 'donors.gq') {
    return <GqLine value={donor?.gq} />;
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
  } else if (key === 'transmission') {
    return removeUnderscoreAndCapitalize(donor?.transmission! || '').defaultMessage(
      TABLE_EMPTY_PLACE_HOLDER,
    );
  } else if (key === 'qd') {
    return donor?.qd ? donor.qd : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'po') {
    return donor ? displayParentalOrigin(donor?.parental_origin!) : TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'alt') {
    return donor?.ad_alt ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'alttotal') {
    return donor?.ad_total ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'altratio') {
    return (donor?.ad_ratio ?? 0).toFixed(2) ?? TABLE_EMPTY_PLACE_HOLDER;
  } else if (key === 'filter') {
    return donor?.filters ?? TABLE_EMPTY_PLACE_HOLDER;
  }
  return <></>;
};

const renderOmim = (variant: { genes: { hits: { edges: Gene[] } } }) => {
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
        const inheritance = omims
          .reduce<string[]>((prev, curr) => [...prev, ...(curr.node.inheritance_code || [])], [])
          .filter((item, pos, self) => self.indexOf(item) == pos);

        return (
          <StackLayout horizontal key={id}>
            <Space key={id} align="center" className={style.variantSnvOmimCellItem}>
              <ExternalLink href={`https://www.omim.org/entry/${item.node.omim_gene_id}`}>
                {item.node.symbol}
              </ExternalLink>
              <Space size={4}>
                {inheritance.length
                  ? inheritance.map((code) => (
                      <Tooltip key={code} title={intl.get(`inheritant.code.${code}`)}>
                        {' '}
                        <Tag color="processing">{code}</Tag>
                      </Tooltip>
                    ))
                  : TABLE_EMPTY_PLACE_HOLDER}
              </Space>
            </Space>
          </StackLayout>
        );
      }}
    />
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
