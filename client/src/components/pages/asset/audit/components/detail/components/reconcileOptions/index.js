import React from 'react';
import Card from '../../../../../../../shared/Card';
import { Tabs } from 'antd';
import Move from './components/move';
import Dispose from './components/dispose';
import Maintenance from './components/maintenance';
import Other from './components/other';

const Reconcile = (props) => {
  const { TabPane } = Tabs;

  return (
    <Card title='Reconcile Option'>
      <Tabs defaultActiveKey='1' size='small'>
        <TabPane tab='Move/Assign to' key='move'>
          <Move details={props.details} setShowModal={props.setShowModal} />
        </TabPane>
        <TabPane tab='Dispose' key='dispose'>
          <Dispose details={props.details} setShowModal={props.setShowModal} />
        </TabPane>
        <TabPane tab='Maintenance' key='maintenance'>
          <Maintenance
            details={props.details}
            setShowModal={props.setShowModal}
          />
        </TabPane>
        <TabPane tab='Other' key='other'>
          <Other details={props.details} setShowModal={props.setShowModal} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Reconcile;
