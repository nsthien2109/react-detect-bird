import React, { useEffect } from 'react';
import { Table, Space, Button, Breadcrumb } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatusAction } from '../status.actions';
import { RootState } from '../../../store/store';

interface BirdStatusType {
  key: number;
  statusName: string;
  statusVietnameseName: string;
}

const columns: ColumnsType<BirdStatusType> = [
  {
    title: 'Status name',
    dataIndex: 'statusName',
    onFilter: (value: any, record) => record.statusName.indexOf(value) === 0,
  },
  {
    title: 'Vietnamese name',
    dataIndex: 'statusVietnameseName',
    onFilter: (value: any, record) => record.statusVietnameseName.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => {}} className="bg-blue-300">
          View Detail
        </Button>
      </Space>
    ),
  },
];

const onChange: TableProps<BirdStatusType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const StatusList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.status.status);

  useEffect(() => {
    dispatch(getAllStatusAction() as any);
  }, []);

  const statusData: BirdStatusType[] = status?.map((item) => {
    return {
      key: item.id,
      statusName: item.statusName,
      statusVietnameseName: item.statusVietnameseName || 'Not Update',
      // onView: () => {
      //   dispatch(getUserData(item) as any);
      //   setOpenHistoryModal(true);
      // },
    };
  });
  return (
    <>
      <Breadcrumb
        className="mb-7"
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: 'Status',
          },
        ]}
      />
      <Table columns={columns} dataSource={statusData} onChange={onChange} />
    </>
  );
};

export default StatusList;
