import React from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Prediction } from '../../../models';
import { deleteHistoryAction } from '../../prediction/prediction.actions';
interface HistoryModalProps {
  open: boolean;
  onCancel: () => void;
}

interface DataType {
  key: number;
  date: string;
  url: string;
  predictions: {
    id: number;
    confidence: number;
    bird: Prediction;
  }[];
  user?: {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    createdAt: string;
  };
  onDelete: () => void;
  onEdit: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ open, onCancel }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.userDetail);
  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (_, record) => (
        <div className="w-[100px] h-[120px]">
          <img className="w-full h-full rounded object-cover" src={record.url} aria-hidden alt="Image url history" />
        </div>
      ),
    },
    {
      title: 'Result',
      dataIndex: 'predictions',
      key: 'predictions',
      render: (_, record) => (
        <div className="">
          <h4 className="font-semibold text-lg">{record.predictions[0]?.bird.common_name}</h4>
          <p>Confidence : {record.predictions[0]?.confidence}%</p>
          <p>Scient Name : {record.predictions[0]?.bird.scientific_name}</p>
        </div>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/birds/${record.predictions[0]?.bird.id}`)} className="bg-blue-300">
            View Bird
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteHistoryAction(record.key) as any);
            }}
            className="bg-red-500"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const historyData: DataType[] =
    user &&
    user.histories?.map((item) => {
      return {
        key: item.id,
        url: item.url || 'Unknow',
        predictions: item.predictions,
        user: item.user,
        date: item.date,
        onDelete: () => {},
        onEdit: () => {},
      };
    });

  return (
    <Modal
      width={'70%'}
      open={open}
      title="History"
      onCancel={onCancel}
      footer={[
        <Button key="cancel-form" type="primary" className="bg-red-500" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={historyData} />
    </Modal>
  );
};

export default HistoryModal;
