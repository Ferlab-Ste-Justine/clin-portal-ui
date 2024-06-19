import intl from 'react-intl-universal';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Space, Tooltip, Typography } from 'antd';
import { extractHits } from 'graphql/utils/query';
import {
  HcComplement,
  HcComplementHits,
  PossiblyHcComplement,
  PossiblyHcComplementHits,
} from 'graphql/variants/models';
import { SNV_VARIANT_PATIENT_QB_ID } from 'views/Snv/utils/constant';

import style from './index.module.css';

type Props = {
  hcComplements: HcComplementHits | PossiblyHcComplementHits | undefined;
  defaultText: string;
  wrap?: boolean;
  size?: number;
  locus?: string;
};

type Complements = HcComplement | PossiblyHcComplement;

const INDEX_VARIANTS = 'Variants';

const isLastItem = (pos: number, l: number) => pos === l - 1;

const isPotential = (x: Complements) => 'count' in x;

const { Text } = Typography;

const getCount = (e: Complements) => {
  if ('locus' in e) {
    return e.locus.length;
  } else if (isPotential(e)) {
    return e.count;
  }
  // must never pass here.
  return null;
};

const getLocus = (e: HcComplement) => e.locus || [];

export const HcComplementDescription = ({
  defaultText,
  hcComplements,
  locus,
  wrap = true,
  size = 8,
}: Props) => {
  const nodes = extractHits<Complements>(hcComplements?.hits);
  const nOfSymbols = nodes?.length ?? 0;
  if (!nodes || nOfSymbols === 0) {
    return <>{defaultText}</>;
  }

  return (
    <Space wrap size={size}>
      {nodes.map((e, index) => (
        <Space key={index} wrap={wrap} size={3}>
          <Text>{e.symbol}</Text>
          <Tooltip title={intl.get('screen.patientsnv.drawer.hc.tooltip', { num: getCount(e) })}>
            <Button
              type="link"
              size="small"
              className={style.hcCountLink}
              onClick={() =>
                addQuery({
                  queryBuilderId: SNV_VARIANT_PATIENT_QB_ID,
                  query: isPotential(e)
                    ? generateQuery({
                        newFilters: [
                          generateValueFilter({
                            field: 'consequences.symbol',
                            value: [e.symbol],
                            index: INDEX_VARIANTS,
                          }),
                          generateValueFilter({
                            field: 'donors.zygosity',
                            value: ['HET'],
                            index: INDEX_VARIANTS,
                          }),
                          generateValueFilter({
                            field: 'donors.ad_alt',
                            value: ['2'],

                            operator: RangeOperators['>'],
                            index: INDEX_VARIANTS,
                          }),
                          generateValueFilter({
                            field: 'external_frequencies.gnomad_genomes_3_1_1.af',
                            value: ['0.01'],
                            rangeFilterNoData: true,
                            operator: RangeOperators['<='],
                            index: INDEX_VARIANTS,
                          }),
                          generateValueFilter({
                            field: 'donors.gq',
                            value: ['20'],
                            operator: RangeOperators['>='],
                            index: INDEX_VARIANTS,
                          }),
                        ],
                      })
                    : generateQuery({
                        newFilters: [
                          generateValueFilter({
                            field: 'locus',
                            value: locus
                              ? [...getLocus(e as HcComplement), locus]
                              : [...getLocus(e as HcComplement)],
                            index: INDEX_VARIANTS,
                          }),
                        ],
                      }),
                  setAsActive: true,
                })
              }
            >
              {' '}
              <Text>( {getCount(e)} )</Text>
            </Button>
            {!isLastItem(index, nOfSymbols) && ','}
          </Tooltip>
        </Space>
      ))}
    </Space>
  );
};
