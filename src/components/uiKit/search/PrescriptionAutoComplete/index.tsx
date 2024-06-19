import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { BooleanOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { ArrangerApi } from 'api/arranger';
import cx from 'classnames';
import { hydrateResults } from 'graphql/models';
import { AnalysisResult, IAnalysisResultTree } from 'graphql/prescriptions/models/Prescription';
import { PRESCRIPTIONS_SEARCH_QUERY } from 'graphql/prescriptions/queries';
import { isEmpty } from 'lodash';
import { commonPrescriptionFilterFields } from 'views/Prescriptions/utils/constant';

import OptionItem from 'components/uiKit/search/PrescriptionAutoComplete/OptionItem';

import styles from './index.module.css';

const generateSearchFilter = (search: string) =>
  generateQuery({
    operator: BooleanOperators.or,
    newFilters: commonPrescriptionFilterFields.map((key) =>
      generateValueFilter({
        field: key,
        value: [`${search}*`],
      }),
    ),
  });

const PrescriptionAutoComplete = (
  props: Omit<AutoCompleteProps, 'onChange' | 'options' | 'children'>,
) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const history = useHistory();

  const formatUrl = (prescription_id: string) => `/prescription/entity/${prescription_id}`;

  return (
    <AutoComplete
      {...props}
      className={cx(styles.prescriptionAutoComplete, props.className)}
      onSearch={async (value) => {
        if (value) {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IAnalysisResultTree }>({
            query: PRESCRIPTIONS_SEARCH_QUERY.loc?.source.body,
            variables: { sqon: generateSearchFilter(value) },
          });
          setResults(hydrateResults(data?.data.Analyses?.hits?.edges ?? []));
        } else {
          setResults([]);
        }
      }}
      onKeyDown={(e) => {
        if (e.code.toLowerCase() === 'enter' && !isEmpty(results)) {
          history.push(formatUrl(results[0].prescription_id!));
        }
      }}
      options={results.map((prescription) => ({
        label: (
          <Link
            className={styles.prescriptionOptionLink}
            to={formatUrl(prescription.prescription_id!)}
            data-cy={prescription.prescription_id!}
          >
            <OptionItem data={prescription} />
          </Link>
        ),
        value: prescription.prescription_id,
      }))}
    >
      <Input suffix={<SearchOutlined />} size="large" data-cy="PrescriptionAutoComplete" />
    </AutoComplete>
  );
};

export default PrescriptionAutoComplete;
