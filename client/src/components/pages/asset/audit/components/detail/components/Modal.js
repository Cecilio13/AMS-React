import React from 'react';
import { Modal } from 'antd';
import Detail from './assetDetail';
import Reconcile from './reconcileOptions';

const DetailModal = (props) => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      footer={null}
      onCancel={props.onCancel}
      width='90%'
    >
      <Detail details={props.reconcileDetail} />
      <Reconcile
        details={props.reconcileDetail}
        setShowModal={props.setShowModal}
      />
    </Modal>
  );
};

export default DetailModal;
