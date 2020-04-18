import React, { useEffect, useState } from 'react';
import Card from '../../../../../../shared/Card';
import { Form, Col, Row, Select, Input, Typography } from 'antd';

const Detail = (props) => {
  const [details, setDetails] = useState({});
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Title } = Typography;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    const {
      asset_tag,
      asset_description,
      asset_location,
      asset_department_code,
    } = props.details.audit_asset;
    form.setFieldsValue({
      asset_tag,
      asset_description,
      asset_location,
      asset_department_code,
    });
  }, [props.details]);

  return (
    <Card title='Asset Detail'>
      <Form
        name='basic'
        form={form}
        {...layout}
        //fields={selected}
        //initialValues={}
        //onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col md={12}>
            <Row>
              <Col md={24}>
                <Title level={2}>Asset Details</Title>
              </Col>
              <Col md={24}>
                <Form.Item label='Asset Tag' name='asset_tag'>
                  <Input disabled />
                </Form.Item>
                <Form.Item label='Asset' name='asset_description'>
                  <Input disabled />
                </Form.Item>
                <Form.Item label='Location' name='asset_location'>
                  <Input disabled />
                </Form.Item>
                <Form.Item label='Department Name' name='asset_department_code'>
                  <Select placeholder='Select' disabled>
                    <Option value='dept1'>Department 1</Option>
                    <Option value='dept2'>Department 2</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Row>
              <Col md={24}>
                <Title level={2}>Last Held By</Title>
              </Col>
              <Col md={24}>
                <Form.Item label='Employee ID' name=''>
                  <Input disabled />
                </Form.Item>
                <Form.Item label='Employee Name' name=''>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Detail;
