import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { IQueryResults } from 'graphql/models';
import { useVariants } from 'graphql/variants/actions';
import { VariantEntity } from 'graphql/variants/models';
import { VARIANT_QUERY, VARIANT_QUERY_NO_DONORS } from 'graphql/variants/queries';
import {
  buildVariantsDownloadCount,
  buildVariantsDownloadSqon,
  downloadAsTSV,
  MAX_VARIANTS_DOWNLOAD,
  MAX_VARIANTS_WITH_DONORS_DOWNLOAD,
  VARIANT_KEY,
} from 'views/Prescriptions/utils/export';
import { getVariantColumns } from 'views/Snv/Exploration/variantColumns';

import GenericModal from 'components/utils/GenericModal';
import { globalActions } from 'store/global';
import { IQueryConfig, TDownload } from 'utils/searchPageTypes';

type OwnProps = {
  downloadKeys: Array<string>;
  setDownloadKeys: TDownload;
  queryVariables: any;
  queryConfig: IQueryConfig;
  variants: IQueryResults<VariantEntity[]>;
  patientId?: string;
  queryBuilderId: string;
};

const Download = ({
  downloadKeys,
  setDownloadKeys,
  queryVariables,
  queryConfig,
  variants,
  patientId,
  queryBuilderId,
}: OwnProps) => {
  const [showModalLimit, setShowModalLimit] = useState(false);
  const dispatch = useDispatch();

  const maxAllowed = patientId ? MAX_VARIANTS_WITH_DONORS_DOWNLOAD : MAX_VARIANTS_DOWNLOAD;
  const variantToDownloadCount = buildVariantsDownloadCount(
    downloadKeys,
    variants.total,
    maxAllowed,
  );

  const variantsToDownload = useVariants(
    {
      ...queryVariables,
      first: variantToDownloadCount,
      searchAfter: undefined,
      sqon: buildVariantsDownloadSqon(downloadKeys, VARIANT_KEY, queryVariables.sqon, patientId),
    },
    queryConfig.operations,
    patientId ? VARIANT_QUERY : VARIANT_QUERY_NO_DONORS,
  );

  useEffect(() => {
    if (downloadKeys.length > 0 && !variantsToDownload.loading) {
      if (variantsToDownload.data.length === 0) {
        if (variantsToDownload.error) {
          dispatch(
            globalActions.displayNotification({
              type: 'error',
              message: intl.get('screen.patientsnv.results.table.download.error.title'),
              description: intl.get('screen.patientsnv.results.table.download.error.message'),
            }),
          );
        } else {
          setShowModalLimit(true);
        }
      } else if (variantsToDownload.data.length > 0) {
        downloadAsTSV(
          variantsToDownload.data,
          downloadKeys,
          VARIANT_KEY,
          getVariantColumns(queryBuilderId, patientId).filter((h) => h.key !== 'actions'), // remove action column,
          'SNV',
          {},
          patientId,
        );
      }
      setDownloadKeys([]); // reset download
    }
  }, [downloadKeys, setDownloadKeys, variantsToDownload, dispatch, patientId]);

  useEffect(() => {
    if (downloadKeys.length > 0 && variantToDownloadCount > 0) {
      dispatch(
        globalActions.displayNotification({
          type: 'info',
          message: intl.get('screen.patientsnv.results.table.download.info.title'),
          description: intl.get('screen.patientsnv.results.table.download.info.message'),
        }),
      );
    }
  }, [dispatch, downloadKeys, variantToDownloadCount]);

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
