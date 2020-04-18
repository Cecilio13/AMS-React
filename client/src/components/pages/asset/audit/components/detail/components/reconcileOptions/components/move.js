import React from 'react';
import { Form, Col, Row, Select, Input, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../../actions';

const Move = (props) => {
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
      audit_status: 'Move/Assign To',
      audit_action_date: Date.now(),
    };
    props.reconcileMoveAudit(data);
    props.setShowModal(false);
  };

  return (
    <>
      <Form name='basic' form={form} {...layout} onFinish={onFinish}>
        <Row>
          <Col md={18}>
            <Row>
              <Col md={24}>
                <Title level={2}>Move/Assign To</Title>
              </Col>
              <Col md={24}>
                <Form.Item label='Move To Location' name='audit_action_reason'>
                  <Input />
                </Form.Item>
                <Form.Item label='Move To Site' name='maintenanceduedate'>
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Move To Department'
                  name='audit_move_department'
                >
                  <Select placeholder='Select'>
                    <Option value='dept1'>Department 1</Option>
                    <Option value='dept2'>Department 2</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label='Assign/Reassign To Employee'
                  name='audit_move_employee'
                >
                  <Select placeholder='Select Employee'>
                    <Option value='employee1'>Employee 1</Option>
                    <Option value='employee2'>Employee 2</Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Note' name='audit_action_note'>
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ float: 'right' }}>
          <Button htmlType='submit'>Reconcile Asset</Button>
        </div>
      </Form>
    </>
  );
};

export default connect(null, actions)(Move);
