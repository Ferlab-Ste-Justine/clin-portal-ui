import React from 'react';
import intl from 'react-intl-universal';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { reportSelector } from 'store/reports/selectors';
import { fetchTranscriptsReport } from 'store/reports/thunks';
import { ReportNames } from 'store/reports/types';

type Props = {
  patientId: string;
  variantId: string;
  name: ReportNames;
  iconOnly?: boolean;
  tooltipTitle: string;
  icon: React.ReactElement;
  size: SizeType;
};

const DownloadButton = ({
  size,
  patientId,
  variantId,
  name,
  iconOnly = false,
  tooltipTitle,
  icon,
}: Props) => {
  const dispatch = useDispatch();
  const { loadingIds } = useSelector(reportSelector);

  const loading = loadingIds.includes(variantId);
  const commonProps = {
    disabled: loading,
    loading,
    icon,
    size,
    onClick: () => {
      if (name === ReportNames.transcript) {
        dispatch(fetchTranscriptsReport({ patientId, variantId }));
      }
    },
  };
  return (
    <Tooltip title={tooltipTitle}>
      {iconOnly ? (
        <Button type={'text'} {...commonProps} />
      ) : (
        <Button {...commonProps}>{intl.get('download.report')}</Button>
      )}
    </Tooltip>
  );
};

export default DownloadButton;
