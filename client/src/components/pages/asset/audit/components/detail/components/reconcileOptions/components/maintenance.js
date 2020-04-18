import React from 'react';
import { Form, Col, Row, Select, Input, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../actions';

const Maintenance = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Title } = Typography;
  const { TextArea } = Input;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    const data = {
      ...props.details,
      ...values,
      audit_status: 'Maintenance',
      audit_action_date: Date.now(),
    };
    props.reconcileMaintenanceAudit(data);
    props.setShowModal(false);
  };

  return (
    <>
      <Form
        name='basic'
        form={form}
        {...layout}
        //fields={selected}
        //initialValues={}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col md={18}>
            <Row>
              <Col md={24}>
                <Title level={2}>Maintenance</Title>
              </Col>
              <Col md={24}>
                <Form.Item
                  label='Maintenance Reason'
                  name='audit_action_reason'
                >
                  <Select placeholder='Select'>
                    <Option value='checkup'>Regular Check up</Option>
                    <Option value='damaged'>Damaged</Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Note' name='maintenanceduedate'>
                  <Input type='date' />
                </Form.Item>
                <Form.Item label='Note' name='audit_action_note'>
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>{' '}
        <div style={{ float: 'right' }}>
          <Button htmlType='submit'>Reconcile Asset</Button>
        </div>
      </Form>
    </>
  );
};

export default connect(null, actions)(Maintenance);
