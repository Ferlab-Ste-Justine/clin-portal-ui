import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Radio, Tooltip } from 'antd';
import { FhirApi } from 'api/fhir';
import { PatientTaskResults } from 'graphql/patients/models/Patient';

import { VariantType } from 'components/Variant/TypeNav';
import useQueryParams from 'hooks/useQueryParams';

import styles from './index.module.css';

export enum VariantSection {
  SNV = 'snv',
  CNV = 'cnv',
  SNVTO = 'snv-to',
  SNVTN = 'snv-tn',
}

export const VariantSectionKey = 'variantSection';

type OwnProps = {
  extum?: boolean;
  requestID?: string;
};

const VariantSectionNav = ({ extum, requestID }: OwnProps) => {
  const queryParams = useQueryParams();
  const { push, location } = useHistory();
  const defaultVariantSection = extum ? VariantSection.SNVTO : VariantSection.SNV;
  const variantSection = queryParams.get(VariantSectionKey) || defaultVariantSection;

  const [task, setTask] = useState<PatientTaskResults>();
  useEffect(() => {
    if (requestID) {
      FhirApi.searchRequestTask(requestID).then(({ data }) => {
        if (data?.data.taskList) {
          setTask(data.data.taskList);
        } else {
          setTask([]);
        }
      });
    }
  }, [requestID]);

  const hasTneba = task?.find(({ type }) => type === 'TNEBA');
  return (
    <Radio.Group
      key="variant-section"
      defaultValue={extum ? VariantSection.SNVTO : VariantSection.SNV}
      value={variantSection}
      className={styles.variantSectionNav}
      buttonStyle="solid"
      size="small"
    >
      <Tooltip title={extum ? 'SNV (tumor-only)' : null}>
        <Radio.Button
          value={extum ? VariantType.SNVTO : VariantType.SNV}
          onClick={() => {
            const variantSection = extum ? VariantSection.SNVTO : VariantSection.SNV;
            push({
              ...location,
              search: `?${new URLSearchParams({
                [VariantSectionKey]: variantSection,
              }).toString()}`,
            });
          }}
        >
          {extum ? 'SNV (TO)' : 'SNV'}
        </Radio.Button>
      </Tooltip>
      {extum && hasTneba && (
        <Tooltip title="SNV (tumor-normal)">
          <Radio.Button
            value={VariantType.SNVTN}
            onClick={() =>
              push({
                ...location,
                search: `?${new URLSearchParams({
                  [VariantSectionKey]: VariantSection.SNVTN,
                }).toString()}`,
              })
            }
          >
            SNV (TN)
          </Radio.Button>
        </Tooltip>
      )}
      <Tooltip title={extum ? 'CNV (tumor-only)' : null}>
        <Radio.Button
          value={VariantType.CNV}
          onClick={() =>
            push({
              ...location,
              search: `?${new URLSearchParams({
                [VariantSectionKey]: VariantSection.CNV,
              }).toString()}`,
            })
          }
        >
          {extum ? 'CNV (TO)' : 'CNV'}
        </Radio.Button>
      </Tooltip>
    </Radio.Group>
  );
};

export default VariantSectionNav;
