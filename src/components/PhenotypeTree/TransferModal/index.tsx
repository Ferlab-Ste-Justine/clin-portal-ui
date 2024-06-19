import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { DeleteOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import { Button, List, Modal, Transfer, Typography } from 'antd';
import { isEmpty } from 'lodash';

import { getFlattenTree } from '../helper';
import { TreeNode } from '../types';
import PhenotypeTree from '..';

import styles from './index.module.css';

interface OwnProps {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onApply: (selectedNodes: TreeNode[]) => void;
}

const PhenotypeModal = ({ visible = false, onApply, onVisibleChange }: OwnProps) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible !== isVisible) {
      setIsVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    if (visible !== isVisible) {
      onVisibleChange && onVisibleChange(isVisible);
    }
  }, [isVisible]);

  const handleCancel = () => {
    setIsVisible(false);
    setTargetKeys([]);
  };

  const handleApply = () => {
    setIsVisible(false);
    onApply(getSelectedNodes());
    setTargetKeys([]);
  };

  const getSelectedNodes = () =>
    getFlattenTree(treeData).filter(({ key }) => targetKeys.includes(key));

  return (
    <Modal
      visible={isVisible}
      title={intl.get('component.phenotypeTree.modal.title')}
      wrapClassName={styles.phenotypeTreeModalWrapper}
      className={styles.phenotypeTreeModal}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {intl.get('component.phenotypeTree.modal.cancelText')}
        </Button>,
        <Button key="apply" type="primary" onClick={handleApply}>
          {intl.get('component.phenotypeTree.modal.okText')}
        </Button>,
      ]}
      onCancel={handleCancel}
      okButtonProps={{ disabled: isEmpty(targetKeys) && isEmpty(treeData) }}
    >
      <Transfer<TreeNode>
        className={styles.hpoTransfer}
        showSelectAll={false}
        targetKeys={targetKeys}
        selectedKeys={[]}
        oneWay
        onChange={(targetKeys, direction) => {
          if (direction === 'left') {
            setTargetKeys(targetKeys);
          }
        }}
        onSelectChange={(s, t) => {
          targetKeys.filter((el) => !t.includes(el));
        }}
        dataSource={getFlattenTree(treeData)}
        operationStyle={{ visibility: 'hidden', width: '5px' }}
        render={(item) => item.title}
      >
        {({ direction, onItemSelect }) => {
          if (direction === 'left') {
            return (
              <PhenotypeTree
                className={styles.phenotypeTree}
                onCheckItem={onItemSelect}
                checkedKeys={targetKeys}
                addTargetKey={(key) => setTargetKeys([...targetKeys, key])}
                setTreeData={setTreeData}
                showSearch
              />
            );
          } else {
            return (
              <List
                size="small"
                dataSource={getSelectedNodes()}
                className={styles.targetList}
                locale={{
                  emptyText: (
                    <Empty
                      imageType="grid"
                      description={intl.get(`component.phenotypeTree.modal.emptySelection`)}
                    />
                  ),
                }}
                renderItem={(item) => (
                  <List.Item key={item.key} className={styles.targetItem}>
                    <Typography.Text>{item.title}</Typography.Text>{' '}
                    <DeleteOutlined
                      className={styles.deleteTargetItemIcon}
                      onClick={() => setTargetKeys(targetKeys.filter((key) => key !== item.key))}
                    />
                  </List.Item>
                )}
              />
            );
          }
        }}
      </Transfer>
    </Modal>
  );
};

export default PhenotypeModal;
