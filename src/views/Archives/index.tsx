import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { FileTextOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ProTable from '@ferlab/ui/core/components/ProTable';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Input, Space, Spin } from 'antd';
import { FhirApi } from 'api/fhir';
import { FhirDoc, FhirOwner } from 'graphql/patients/models/Patient';
import { isEmpty } from 'lodash';
import { getAchivesTableColumns } from 'views/Archives/columns';

import ContentWithHeader from 'components/Layout/ContentWithHeader';
import ScrollContentWithFooter from 'components/Layout/ScrollContentWithFooter';
import useQueryParams from 'hooks/useQueryParams';
import { useUser } from 'store/user';
import { updateConfig } from 'store/user/thunks';
import { getProTableDictionary } from 'utils/translation';

import { extractDocsFromTask } from './helper';

import styles from './index.module.css';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

export type DocsWithTaskInfo = FhirDoc & {
  key: string;
  taskAuthoredOn: string;
  taskOwner: FhirOwner;
  taskId: string;
  patientId: string;
  hash: string;
  srRef: string;
  basedOnSrRef: string;
  size: string;
  originalSize: number;
  title: string;
  format: string;
  url: string;
  taskRunAlias: string;
  action: {
    format: string;
    metadata: FhirDoc;
    urls: {
      file: string;
      index: string;
    };
  };
};

const Archives = () => {
  const query = useQueryParams();
  const dispatch = useDispatch();
  const { user } = useUser();
  const [currentPageSize, setcurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [docs, setDocs] = useState<DocsWithTaskInfo[]>([]);

  const handleSearch = (searchValue: string) => {
    if (searchValue) {
      setIsLoading(true);
      FhirApi.searchPatientFiles(searchValue)
        .then(({ data }) => {
          if (data?.data.taskList) {
            setDocs(extractDocsFromTask(data.data.taskList));
          } else {
            setDocs([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setSearchDone(true);
        });
    }
  };

  useEffect(() => {
    const searchValue = query.get('search');
    if (searchValue) {
      setSearchValue(searchValue);
      handleSearch(searchValue);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ContentWithHeader
      headerProps={{
        icon: <FileTextOutlined />,
        title: intl.get('screen.archives.search.title'),
      }}
    >
      <ScrollContentWithFooter container>
        <Space
          direction="vertical"
          className={styles.archiveWrapper}
          size={24}
          data-cy="ArchivesSpace"
        >
          <Input.Search
            className={styles.archiveSearchBar}
            placeholder={intl.get('screen.archives.search.bar.placeholder')}
            allowClear
            onSearch={handleSearch}
            enterButton={intl.get('screen.archives.search.bar.btntext')}
            size="large"
            loading={isLoading}
            value={searchValue}
            data-cy="ArchivesSearch"
            onChange={(e) => {
              if (!e.target.value) {
                setDocs([]);
                setSearchValue('');
                setSearchDone(false);
              } else {
                setSearchValue(e.target.value);
              }
            }}
          />
          <GridCard
            content={
              <Spin spinning={isLoading}>
                {isEmpty(docs) ? (
                  <Empty
                    imageType="grid"
                    description={
                      searchValue && searchDone
                        ? intl.get('no.results.found')
                        : intl.get('screen.archives.search.noresults')
                    }
                  />
                ) : (
                  <ProTable
                    tableId="archives-table"
                    size="small"
                    dictionary={getProTableDictionary()}
                    bordered
                    onChange={({ current, pageSize }) => {
                      if (currentPage !== current || currentPageSize !== pageSize) {
                        setCurrentPage(current!);
                        setcurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
                      }
                    }}
                    showSorterTooltip={false}
                    headerConfig={{
                      itemCount: {
                        pageIndex: currentPage,
                        pageSize: currentPageSize,
                        total: docs.length,
                      },
                      enableColumnSort: true,
                      onColumnSortChange: (columns) => {
                        dispatch(
                          updateConfig({
                            data_exploration: {
                              tables: {
                                archives: { columns },
                              },
                            },
                          }),
                        );
                      },
                    }}
                    pagination={{
                      current: currentPage,
                      pageSize: currentPageSize,
                      defaultPageSize: DEFAULT_PAGE_SIZE,
                      total: docs.length,
                      showSizeChanger: true,
                      hideOnSinglePage: true,
                    }}
                    columns={getAchivesTableColumns()}
                    initialColumnState={user.config.data_exploration?.tables?.archives?.columns}
                    dataSource={docs}
                  />
                )}
              </Spin>
            }
          />
        </Space>
      </ScrollContentWithFooter>
    </ContentWithHeader>
  );
};

export default Archives;
