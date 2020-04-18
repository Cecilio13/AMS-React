import React, { useEffect, useState, useRef } from 'react';
import { PageHeader, Typography, Col, Row, Form, Input, Select, Button, Table } from 'antd';
import Card from '../../../shared/Card';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import * as query from '../../../../queries';
import { columns } from './components/columns';
import ReactToPrint from 'react-to-print';
import Excel from './components/excel';
import Print from './components/print';
import AuditDetail from './components/detail';

const Audit = (props) => {
  const [location, setLocation] = useState('');
  const [assets, setAssets] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedExisting, setSelectedExisting] = useState([]);
  const [auditNote, setAuditNote] = useState('');
  const [auditName, setAuditName] = useState('');
  const [processAudit, setProcessAudit] = useState(false);

  const printRef = useRef(null);
  const [printing, setPrinting] = useState(false);

  const [form] = Form.useForm();

  const { Title } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = async (values) => {
    const { asset_location, asset_site } = values;
    const audit = await query.fetchAuditByLocationAndSite(asset_location, asset_site);
    setAssets(audit.data);
  };

  const locationChanged = (value) => {
    setLocation(value);
  };

  const reset = () => {
    props.getExistingAudit(auditName);
    //setAssets([]);
    //form.resetFields();
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
    [selectedExisting.length > 0 ? 'selectedRowKeys' : null]: selectedExisting,
  };

  const saveAudit = async (e) => {
    const data = assets.map((asset) => {
      if (selectedRowKeys.includes(asset._id)) {
        return {
          ...asset,
          audit_check: true,
          audit_asset: asset._id,
          audit_date: Date.now(),
          audit_location: asset.asset_location,
          audit_site: asset.asset_site,
          audit_note: auditNote,
          audit_window_name: auditName,
        };
      } else {
        return {
          ...asset,
          audit_asset: asset._id,
          audit_date: Date.now(),
          audit_location: asset.asset_location,
          audit_site: asset.asset_site,
          audit_note: auditNote,
          audit_window_name: auditName,
        };
      }
    });

    await props.saveAudit(data);
  };

  const handleNote = (e) => {
    setAuditNote(e.target.value);
  };

  const handleName = (e) => {
    setAuditName(e.target.value);
  };

  const showProcessAudit = async () => {
    await props.getExistingAudit(auditName);
    setProcessAudit(true);
  };

  useEffect(() => {
    props.getAssets();
    console.log('triggered');
    if (props.exist) {
      setSelectedExisting([]);
      let existingAudit = [];
      let selectedExist = [];
      props.exist.map((audit) => {
        setAuditName(audit.audit_window_name);
        setAuditNote(audit.audit_note);
        form.setFieldsValue({ asset_location: audit.audit_location });
        form.setFieldsValue({ asset_site: audit.audit_site });
        form.setFieldsValue({ asset_note: audit.audit_note });
        if (audit.audit_check) {
          selectedExist.push(audit.audit_asset._id);
        }
        existingAudit.push(audit.audit_asset);
      });
      setSelectedExisting(selectedExist);
      setAssets(existingAudit);
    }
  }, [props.exist]);

  return processAudit ? (
    <AuditDetail audit={props.exist} />
  ) : (
    <div>
      <PageHeader title='Audit' />
      <Card title='Filter asset to Audit'>
        <Title level={2}>Audit Detail</Title>
        <Form
          name='basic'
          {...layout}
          form={form}
          //initialValues={}
          //onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Col md={24}>
            <Row>
              <Col md={12}>
                <Form.Item label='Audit Window Name' name='audit_name'>
                  <Input
                    placeholder='e.g. Audit-Department_Name...'
                    onChange={handleName}
                    addonAfter={
                      <Button type='link' onClick={reset}>
                        Fetch
                      </Button>
                    }
                  />
                </Form.Item>
                <Form.Item label='Location' name='asset_location'>
                  <Select placeholder='Select' onChange={locationChanged}>
                    {props.assets?.map((asset, index) => {
                      return (
                        <Option key={index} value={asset.asset_location}>
                          {asset.asset_location}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label='Site' name='asset_site'>
                  <Select placeholder='Select'>
                    {props.assets?.map((asset, index) => {
                      if (asset.asset_location !== location) return;
                      return (
                        <Option key={index} value={asset.asset_site}>
                          {asset.asset_site}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item label='Start Date' name='start_date'>
                  <Input type='date' />
                </Form.Item>
                <Form.Item label='Note' name='asset_note'>
                  <TextArea onChange={handleNote} />
                </Form.Item>
              </Col>
              <Col md={24}>
                <div style={{ float: 'right' }}>
                  <Button htmlType='submit'>Fetch Asset</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Form>
      </Card>
      <Card title='Asset List'>
        <div ref={printRef}>
          {printing ? (
            <Table
              dataSource={selectedRows}
              columns={columns}
              loading={selectedRows ? false : true}
              rowKey={(row) => row._id}
              pagination={false}
            />
          ) : (
            <Table
              dataSource={assets}
              columns={columns}
              loading={assets ? false : true}
              rowKey={(row) => row._id}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              onRow={(row) => ({
                onClick: () => {
                  console.log(row);
                },
              })}
            />
          )}
        </div>
        <Excel selectedRows={selectedRows} />
        <Print printRef={printRef.current} setPrinting={setPrinting} />
        <Button htmlType='button' onClick={saveAudit}>
          Save Audit
        </Button>
      </Card>
      <Card title='Asset Unassigned to this Location'>
        <Table
          //dataSource={selectedRows}
          columns={columns}
          //loading={selectedRows ? false : true}
          //rowKey={(row) => row._id}
          pagination={false}
        />
        <div style={{ float: 'right' }}>
          <Button htmlType='button' onClick={showProcessAudit}>
            Process Audit
          </Button>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    assets: state.assets?.assets,
    exist: state.audits?.existAudit,
  };
};

export default connect(mapStateToProps, actions)(Audit);
