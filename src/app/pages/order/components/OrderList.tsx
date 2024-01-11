import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Breadcrumb, Spin } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAllOrderAction, getOrderAction } from '../order.actions';
import BirdModel from '../../../shared/components/BirdModel';

interface BirdOrderType {
  key: number;
  orderName: string;
  orderVietnameseName: string;
}

const onChange: TableProps<BirdOrderType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const OrderList = () => {
  const dispatch = useDispatch();
  const [isOpenBirdModel, setIsOpenBirdModel] = useState(false);

  const { orders, orderDetail, isLoading } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getAllOrderAction() as any);
  }, []);

  const columns: ColumnsType<BirdOrderType> = [
    {
      title: 'Order name',
      dataIndex: 'orderName',
      onFilter: (value: any, record) => record.orderName.indexOf(value) === 0,
    },
    {
      title: 'Vietnamese name',
      dataIndex: 'orderVietnameseName',
      onFilter: (value: any, record) => record.orderVietnameseName.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={async () => {
              await dispatch(getOrderAction(record.key) as any);
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

  const ordersData: BirdOrderType[] = orders?.map((item) => {
    return {
      key: item.id,
      orderName: item.orderName,
      orderVietnameseName: item.orderVietnameseName || 'Not Update',
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
            title: 'Orders',
          },
        ]}
      />
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={ordersData} onChange={onChange} />
      </Spin>
      <BirdModel
        data={[...(orderDetail.birds ?? [])]}
        isLoading={isLoading}
        open={isOpenBirdModel}
        onCancel={() => {
          setIsOpenBirdModel(false);
        }}
      />
    </>
  );
};

export default OrderList;
