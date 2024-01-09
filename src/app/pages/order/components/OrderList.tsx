import React, { useEffect } from 'react';
import { Table, Space, Button, Breadcrumb } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAllOrderAction } from '../order.actions';

interface BirdOrderType {
  key: number;
  orderName: string;
  orderVietnameseName: string;
}

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
        <Button onClick={() => {}} className="bg-blue-300">
          View Detail
        </Button>
      </Space>
    ),
  },
];

const onChange: TableProps<BirdOrderType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    dispatch(getAllOrderAction() as any);
  }, []);

  const ordersData: BirdOrderType[] = orders?.map((item) => {
    return {
      key: item.id,
      orderName: item.orderName,
      orderVietnameseName: item.orderVietnameseName || 'Not Update',
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
            title: 'Orders',
          },
        ]}
      />
      <Table columns={columns} dataSource={ordersData} onChange={onChange} />
    </>
  );
};

export default OrderList;
