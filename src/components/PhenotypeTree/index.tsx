import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { AutoComplete, Spin, Tree } from 'antd';
import { HpoApi } from 'api/hpo';
import { IHpoNode } from 'api/hpo/models';
import { map } from 'lodash';

import { isChecked } from './helper';
import { TreeNode } from './types';

import styles from './index.module.css';

interface OwnProps {
  checkedKeys?: string[];
  onCheckItem?: (key: string, check: boolean) => void;
  addTargetKey?: (key: string) => void;
  setTreeData?: (nodes: TreeNode[]) => void;
  height?: number;
  showSearch?: boolean;
  className?: string;
}

const ROOT_PHENOTYPE = 'Phenotypic abnormality (HP:0000118)';

const hpoDisplayName = (key: string, name: string) => `${name} (${key})`;

const hpoToTreeNode = (hpo: IHpoNode): TreeNode => ({
  title: hpoDisplayName(hpo.hpo_id, hpo.name),
  key: hpo.hpo_id,
  hasChildren: !hpo.is_leaf,
  isLeaf: hpo.is_leaf,
  children: [],
  disabled: false,
});

const fetchRootNodes = async (root: string) => {
  const { data, error } = await HpoApi.searchHpoChildren(root);

  if (error) {
    return [];
  }

  return data!.hits.map((item) => hpoToTreeNode(item._source)) ?? [];
};

const PhenotypeTree = ({
  checkedKeys = [],
  onCheckItem,
  addTargetKey,
  setTreeData,
  height = 600,
  showSearch = false,
  className = '',
}: OwnProps) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<IHpoNode[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetchRootNodes(ROOT_PHENOTYPE).then((nodes) => {
      setIsLoading(false);
      setTreeNodes(nodes);
    });
  }, []);

  useEffect(() => {
    setTreeData && setTreeData(treeNodes);
  }, [treeNodes]);

  const onLoadHpoChildren = (treeNodeClicked: any) =>
    new Promise<void>((resolve) => {
      const { title } = treeNodeClicked;

      setIsLoading(true);
      HpoApi.searchHpoChildren(title).then(({ data, error }) => {
        const node: TreeNode = treeNodeClicked.props.data;
        setIsLoading(false);

        if (!error) {
          node.children = data?.hits.map((item) => hpoToTreeNode(item._source));
          setTreeNodes([...treeNodes]);
          resolve();
        }
      });
    });

  const handleHpoSearchTermChanged = (term: string) => {
    HpoApi.searchHpos(term.toLowerCase().trim()).then(({ data, error }) => {
      if (!error) {
        const results = map(data?.hits, '_source');
        setCurrentOptions(results);
      }
    });
  };

  return (
    <div className={className}>
      <Spin spinning={isLoading}>
        {showSearch && (
          <AutoComplete
            className={styles.phenotypeAutocompleteSearch}
            placeholder={intl.get('component.phenotypeTree.searchPlaceholder')}
            options={currentOptions.map(({ name, hpo_id }) => ({ label: name, value: hpo_id }))}
            onChange={handleHpoSearchTermChanged}
            onSelect={(value: string) => {
              addTargetKey && addTargetKey(value);
            }}
          />
        )}
        <Tree
          loadData={onLoadHpoChildren}
          checkStrictly
          checkable
          checkedKeys={checkedKeys}
          onCheck={(_, { node: { key } }) => {
            onCheckItem && onCheckItem(key.toString(), !isChecked(checkedKeys, key.toString()));
            addTargetKey && addTargetKey(key.toString());
          }}
          onSelect={(_, { node: { key } }) => {
            onCheckItem && onCheckItem(key.toString(), !isChecked(checkedKeys, key.toString()));
            addTargetKey && addTargetKey(key.toString());
          }}
          treeData={treeNodes}
          height={height}
        />
      </Spin>
    </div>
  );
};

export default PhenotypeTree;
