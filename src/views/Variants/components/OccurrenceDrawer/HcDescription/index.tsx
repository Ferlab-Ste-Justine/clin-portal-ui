import intl from 'react-intl-universal';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Space, Tooltip, Typography } from 'antd';
import { extractHits } from 'graphql/utils/query';
import {
  HcComplement,
  HcComplementHits,
  PossiblyHcComplement,
  PossiblyHcComplementHits,
} from 'graphql/variants/models';
import { VARIANT_PATIENT_QB_ID } from 'views/Variants/utils/constant';

import style from './index.module.scss';

type Props = {
  hcComplements: HcComplementHits | PossiblyHcComplementHits | undefined;
  defaultText: string;
  wrap?: boolean;
  size?: number;
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
  wrap = true,
  size = 8,
}: Props) => {
  const nodes = extractHits<Complements>(hcComplements?.hits);
  const nOfSymbols = nodes?.length ?? 0;
  if (!nodes || nOfSymbols === 0) {
    return <Text>{defaultText}</Text>;
  }

  return (
    <Space wrap size={size}>
      {nodes.map((e, index) => (
        <Space key={index} wrap={wrap} size={3}>
          <Text>{e.symbol}</Text>
          <Tooltip
            title={intl.get('screen.patientvariant.drawer.hc.tooltip', { num: getCount(e) })}
          >
            <Button
              type="link"
              size="small"
              className={style.hcCountLink}
              onClick={() =>
                addQuery({
                  queryBuilderId: VARIANT_PATIENT_QB_ID,
                  query: generateQuery({
                    newFilters: [
                      generateValueFilter({
                        field: 'consequences.symbol',
                        value: [e.symbol],
                        index: INDEX_VARIANTS,
                      }),
                      generateValueFilter(
                        isPotential(e)
                          ? {
                              field: 'donors.zygosity',
                              value: ['HET'],
                              index: INDEX_VARIANTS,
                            }
                          : {
                              field: 'locus',
                              value: [...getLocus(e as HcComplement)],
                              index: INDEX_VARIANTS,
                            },
                      ),
                    ],
                  }),
                  setAsActive: true,
                })
              }
            >
              <Text>( {getCount(e)} )</Text>
            </Button>
            {!isLastItem(index, nOfSymbols) && ','}
          </Tooltip>
        </Space>
      ))}
    </Space>
  );
};
