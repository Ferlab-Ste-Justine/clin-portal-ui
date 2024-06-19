import React, { useEffect } from 'react';
import { Modal } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

type OwnProps = {
  type: string;
  title: string;
  message: string;
  okText: string;
  showModal: boolean;
  onClose: () => void;
};

const GenericModal = ({ type, title, message, okText, showModal, onClose }: OwnProps) => {
  const [modal, modalHolder] = Modal.useModal();

  useEffect(() => {
    if (showModal) {
      modal.warning({
        className: cx(styles.antModal, styles[type]),
        title,
        content: (
          <>
            <p>{message}</p>
          </>
        ),
        okText,
        onOk: () => onClose(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return <>{modalHolder}</>;
};

export default GenericModal;
