export const columns = [
  {
    title: 'Asset Tag',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_tag,
  },
  {
    title: 'Asset',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_description,
  },
  {
    title: 'Category',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_category_name,
  },
  {
    title: 'Sub Category',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_sub_category,
  },
  {
    title: 'Brand',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_brand,
  },
  {
    title: 'Serial Number',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_serial_number,
  },
  {
    title: 'Plate Number',
    dataIndex: 'audit_asset',
    render: (row) => row?.plate_number,
  },
  {
    title: 'Department',
    dataIndex: 'audit_asset',
    render: (row) => row?.asset_department_code,
  },
  {
    title: 'Initial Value',
    dataIndex: 'audit_asset',
    render: (row) => row?.initial_value,
  },
  {
    title: 'Deprecated Value',
    dataIndex: 'audit_asset',
    render: (row) => row?.depreciation_cost,
  },
  {
    title: 'Status',
    dataIndex: 'asset_transaction_status',
    render: (row) => row?.asset_transaction_status,
  },
];
