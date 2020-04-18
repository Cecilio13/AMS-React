import React, { useEffect, useState } from 'react';
import { Typography, Space, Table, Button } from 'antd';
import Card from '../../../../../shared/Card';
import { columns } from './components/columns';
import Modal from './components/Modal';
import * as actions from '../../../../../../actions';
import { connect } from 'react-redux';

const Detail = (props) => {
  const [found, setFound] = useState([]);
  const [notFound, setNotFound] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reconcileDetail, setReconcileDetail] = useState({});

  const { Title } = Typography;

  const finishAudit = () => {
    props.finishAudit(props.audit);
  };

  useEffect(() => {
    const f = [];
    const n = [];
    const u = [];
    props.audit.map((asset) => {
      if (asset.audit_check) return;
      n.push(asset);
    });
    props.audit.map((asset) => {
      if (!asset.audit_check) return;
      f.push(asset);
    });
    setNotFound(n);
    setFound(f);
  }, [props.audit]);

  return (
    <>
      <Modal
        title='Reconcile'
        visible={showModal}
        close={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        reconcileDetail={reconcileDetail}
        setShowModal={setShowModal}
      />
      <Space direction='vertical' size={-5}>
        <Title level={2}>Audit Name: {props.audit[0]?.audit_window_name}</Title>
      </Space>
      <br />
      <Space direction='vertical' size={-5}>
        <Title level={4}>Location: {props.audit[0]?.audit_location}</Title>
      </Space>
      <br />
      <Space direction='vertical' size={-5}>
        <Title level={4}>Site: {props.audit[0]?.audit_site}</Title>
      </Space>
      <Card title='FOUND'>
        <Table
          dataSource={found}
          columns={columns}
          //loading={props.audit?.audit_asset ? false : true}
          rowKey={(row) => row._id}
          onRow={(row) => ({
            onClick: () => {
              console.log(row);
            },
          })}
        />
      </Card>
      <Card title='NOT FOUND'>
        <Table
          dataSource={notFound}
          columns={columns}
          //loading={props.audit?.audit_asset ? false : true}
          rowKey={(row) => row._id}
          onRow={(row) => ({
            onClick: () => {
              //console.log(row);
              setReconcileDetail(row);
              setShowModal(true);
            },
          })}
        />
      </Card>
      <Card title='ASSET UNASSIGNED TO THIS LOCATION'>
        <Table
          //dataSource={props.audit}
          columns={columns}
          //loading={props.audit?.audit_asset ? false : true}
          rowKey={(row) => row._id}
          onRow={(row) => ({
            onClick: () => {
              console.log(row);
            },
          })}
        />
      </Card>
      <div style={{ float: 'right' }}>
        <Button onClick={finishAudit}>Finish Audit</Button>
      </div>
    </>
  );
};

export default connect(null, actions)(Detail);
