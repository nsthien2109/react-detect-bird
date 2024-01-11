import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Breadcrumb, Spin } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatusAction, getStatusAction } from '../status.actions';
import { RootState } from '../../../store/store';
import BirdModel from '../../../shared/components/BirdModel';

interface BirdStatusType {
  key: number;
  statusName: string;
  statusVietnameseName: string;
}

const onChange: TableProps<BirdStatusType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const StatusList = () => {
  const dispatch = useDispatch();
  const [isOpenBirdModel, setIsOpenBirdModel] = useState(false);

  const { status, statusDetail, isLoading } = useSelector((state: RootState) => state.status);

  useEffect(() => {
    dispatch(getAllStatusAction() as any);
  }, []);

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
          <Button
            onClick={async () => {
              await dispatch(getStatusAction(record.key) as any);
              setIsOpenBirdModel(true);
            }}
            className="bg-blue-300"
          >
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  const statusData: BirdStatusType[] = status?.map((item) => {
    return {
      key: item.id,
      statusName: item.statusName,
      statusVietnameseName: item.statusVietnameseName || 'Not Update',
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
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={statusData} onChange={onChange} />
      </Spin>
      <BirdModel
        data={[...(statusDetail.birds ?? [])]}
        open={isOpenBirdModel}
        isLoading={isLoading}
        onCancel={() => {
          setIsOpenBirdModel(false);
        }}
      />
    </>
  );
};

export default StatusList;
