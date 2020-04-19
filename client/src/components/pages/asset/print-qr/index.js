import React, { useEffect, useState, useRef } from 'react';
import { Table, PageHeader, Affix, Button } from 'antd';
import { getAssetsQuery } from '../../../../queries';
import ReactToPrint from 'react-to-print';
import QRCode from 'qrcode';

const PrintQr = (props) => {
  const [assets, setAssets] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const printRef = useRef(null);
  const [printing, setPrinting] = useState(false);

  const columns = [
    {
      title: 'QR Code',
      render: (row) => {
        return <img src={row.img} alt='tag' />;
      },
    },
    {
      title: 'Asset Description',
      render: (row) => row.asset_description,
    },
  ];

  const printColumn = [
    {
      title: 'QR Code',
      render: (row) => {
        return <img src={row.img} alt='tag' />;
      },
    },
    {
      title: 'Asset Tag',
      render: (row) => row.asset_tag,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows);
    },
  };

  useEffect(() => {
    const getAssets = async () => {
      console.log('useEffect in printqr rendered');
      const assets = await getAssetsQuery();
      let newAssets = [];
      const qr = async (tag) => await QRCode.toDataURL(tag);
      await Promise.all(
        assets.data.map(async (asset) => {
          return newAssets.push({
            ...asset,
            img: await qr(asset.asset_tag),
          });
        })
      );
      setAssets(newAssets);
    };
    getAssets();
  }, []);

  return (
    <div>
      <PageHeader title='QR Codes' />
      <div ref={printRef}>
        {printing ? (
          <Table
            columns={printColumn}
            dataSource={selectedRows}
            loading={assets ? false : true}
            rowKey={(row) => row._id}
            pagination={false}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={assets}
            loading={assets ? false : true}
            rowKey={(row) => row._id}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
          />
        )}
      </div>
      <ReactToPrint
        trigger={() => (
          <Affix offsetBottom={30} style={{ float: 'right' }}>
            <Button type='primary' size='large'>
              Print
            </Button>
          </Affix>
        )}
        content={() => printRef.current}
        onBeforeGetContent={async () => await setPrinting(true)}
        onAfterPrint={() => setPrinting(false)}
      />
    </div>
  );
};

export default PrintQr;
