import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
import { downloadAsTSV } from 'views/Prescriptions/utils/export';

import GenericModal from 'components/utils/GenericModal';
import { globalActions } from 'store/global';

import { sendRequestWithRpt } from '../api';
import { ARRANGER_API_PROJECT_URL } from '../providers/ApolloProvider';

type OwnProps = {
  downloadKeys: any;
  queryVariables: any;
  maxAllowed: number;
  columns?: any;
  prefix: string;
  triggered: boolean;
  setTriggered: any;
  total: number;
  mapping?: any;
  columnKey: string;
  data: any;
  query: any;
  operations?: any;
  patientId?: any;
  queryKey: string;
  setDownloadKeys: any;
};

const Download = ({
  maxAllowed,
  downloadKeys,
  columns,
  queryVariables,
  triggered,
  setTriggered,
  prefix,
  total,
  mapping,
  columnKey,
  query,
  operations,
  patientId,
  data,
  queryKey,
  setDownloadKeys,
}: OwnProps) => {
  const [showModalLimit, setShowModalLimit] = useState(false);
  const dispatch = useDispatch();
  let dataToDownload = data;

  const download = async () => {
    if (!dataToDownload.length && downloadKeys.length === 0) downloadKeys.push('*');
    if (downloadKeys.includes('*') && total > maxAllowed && !dataToDownload.length) {
      setShowModalLimit(true);
    } else {
      dispatch(
        globalActions.displayNotification({
          type: 'info',
          message: intl.get('screen.patientsnv.results.table.download.info.title'),
          description: intl.get('screen.patientsnv.results.table.download.info.message'),
        }),
      );
      if ((downloadKeys.includes('*') || !downloadKeys.length) && !dataToDownload.length) {
        dataToDownload = await sendRequestWithRpt<{ data: any }>({
          method: 'POST',
          url: ARRANGER_API_PROJECT_URL,
          data: {
            query: query.loc ? query.loc!.source.body : query,
            variables: {
              ...queryVariables,
              first: !dataToDownload.length ? total : queryVariables.first,
            },
          },
        })
          .then((res: any) =>
            hydrateResults(res.data.data[queryKey]?.hits?.edges || [], operations?.previous),
          )
          .catch(() => {
            dispatch(
              globalActions.displayNotification({
                type: 'error',
                message: intl.get('screen.patientsnv.results.table.download.error.title'),
                description: intl.get('screen.patientsnv.results.table.download.error.message'),
              }),
            );
          });
      }

      downloadAsTSV(
        dataToDownload && dataToDownload.length ? dataToDownload : data,
        [],
        columnKey,
        columns.filter((col: any) => col.key !== 'actions'),
        prefix,
        mapping,
        patientId ? patientId : undefined,
      );
      setDownloadKeys([]);
    }
    setTriggered(false);
  };

  useEffect(() => {
    if (triggered) {
      download();
    }
  }, [triggered]);

  return (
    <>
      <GenericModal
        type={'warning'}
        title={intl.get('screen.patientsnv.results.table.download.limit.title')}
        message={intl.get('screen.patientsnv.results.table.download.limit.message', {
          MAX_VARIANTS_DOWNLOAD: maxAllowed,
        })}
        okText={intl.get('screen.patientsnv.results.table.download.limit.button')}
        showModal={showModalLimit}
        onClose={() => setShowModalLimit(false)}
      />
    </>
  );
};

export default Download;
