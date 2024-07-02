import { useContext, useEffect, useState } from 'react';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { IProTableDictionary } from '@ferlab/ui/core/components/ProTable/types';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { FhirApi } from 'api/fhir';
import { DocsWithTaskInfo } from 'views/Archives';
import { extractDocsFromTask } from 'views/Archives/helper';

import Footer from 'components/Layout/Footer';
import { useAppDispatch } from 'store';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

import PrescriptionEntityContext from '../../context';
import { getPatientAndRequestId } from '../Variants/utils';

import { getFileTableColumns } from './columns';

import styles from '../index.module.css';

const PrescriptionFiles = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { prescription } = useContext(PrescriptionEntityContext);
  const [docs, setDocs] = useState<DocsWithTaskInfo[]>([]);

  const getAllRequestIds = () => {
    const { requestId } = getPatientAndRequestId(prescription?.subject.resource);
    const otherRequestIds = (prescription?.extensions || []).map((ext) => {
      const extensionValueRef = ext?.extension?.[1];
      const { requestId } = getPatientAndRequestId(extensionValueRef?.valueReference?.resource);
      return requestId;
    });

    return [requestId, ...otherRequestIds].filter((e) => !!e?.trim());
  };

  const allRequestIds = getAllRequestIds();

  useEffect(() => {
    const fetchAllFiles = async () => {
      setLoading(true);
      const results = await Promise.all(
        allRequestIds.map<Promise<DocsWithTaskInfo[]>>((requestId) =>
          FhirApi.searchPatientFiles(requestId).then(({ data }) => {
            if (data?.data.taskList) {
              return extractDocsFromTask(data.data.taskList);
            } else {
              return [];
            }
          }),
        ),
      );
      setLoading(false);

      setDocs(results.reduce((a, b) => [...a, ...b], []));
    };

    if (allRequestIds.length) {
      fetchAllFiles();
    }
  }, [JSON.stringify(allRequestIds)]);

  const initialColumnState = user.config.data_exploration?.tables?.prescriptionEntityFiles?.columns;
  const tableDict = getProTableDictionary();

  return (
    <div className={styles.prescriptionEntityFileWrapper}>
      <div className={styles.content}>
        <GridCard
          content={
            <ProTable
              tableId="prescription-entity-files"
              columns={getFileTableColumns()}
              dataSource={docs}
              initialColumnState={initialColumnState}
              headerConfig={{
                enableColumnSort: true,
                onColumnSortChange: (columns) => {
                  dispatch(
                    updateConfig({
                      data_exploration: {
                        tables: {
                          prescriptionEntityFiles: { columns },
                        },
                      },
                    }),
                  );
                },
              }}
              pagination={undefined}
              loading={loading}
              showSorterTooltip={false}
              dictionary={{
                ...tableDict,
                itemCount: {
                  ...tableDict.itemCount,
                  noResults: <span />,
                } as IProTableDictionary['itemCount'],
              }}
              size="small"
              bordered
            />
          }
        />
      </div>
      <Footer />
    </div>
  );
};

export default PrescriptionFiles;
