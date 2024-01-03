import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import UserCreateForm from '../components/UserCreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction, deleteUserAction, getAllUsersAction, getUserData, updateUserAction } from '../user.actions';
import { RootState } from '../../../store/store';
import { CreateUserData, User } from '../../../models/user';
import UserUpdateForm from '../components/UserUpdateForm';
import HistoryModal from '../components/HistoryModal';

interface DataType {
  key: string;
  username: string;
  email: string;
  isActive: string;
  role: number;
  onView: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const UserList: React.FC = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const user = useSelector((state: RootState) => state.users.userDetail);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const onCreate = (values: CreateUserData) => {
    dispatch(createUserAction(values) as any);
    setOpenCreateModal(false);
  };

  const onUpdate = (values: User) => {
    dispatch(updateUserAction(values.id, values) as any);
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    dispatch(getAllUsersAction() as any);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <Link to="/">{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, record) => {
        console.log(record.isActive);

        return (
          <Tag color={record.isActive ? 'green' : 'orange-inverse'} key={record.key}>
            {record.isActive ? 'Active' : 'Blocked'}
          </Tag>
        );
      },
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (_, record) => (
        <Tag color={record.role === 1 ? 'warning' : 'pink'} key={record.key}>
          {record.role === 1 ? 'Admin' : 'User'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={record.onView} className="bg-blue-300">
            View History
          </Button>
          <Button onClick={record.onEdit} className="bg-blue-300 hidden lg:block">
            Edit
          </Button>
          <Button onClick={record.onDelete} className="bg-red-500 hidden lg:block">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const userData: DataType[] = users?.map((item) => {
    return {
      key: `${item.id}`,
      username: item.username,
      email: item.email,
      isActive: item.isActive,
      role: item.role.id,
      onView: () => {
        dispatch(getUserData(item) as any);
        setOpenHistoryModal(true);
      },
      onDelete: () => {
        dispatch(deleteUserAction(item.id) as any);
      },
      onEdit: () => {
        dispatch(getUserData(item) as any);
        setOpenUpdateModal(true);
      },
    };
  });

  return (
    <>
      <div className="flex items-center justify-between mb-7">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Dashboard</Link>,
            },
            {
              title: 'Users',
            },
          ]}
        />
        <Button
          type="primary"
          className="bg-[#212B36]"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreateModal(true)}
        >
          New User
        </Button>
        <UserCreateForm
          open={openCreateModal}
          onCreate={onCreate}
          onCancel={() => {
            setOpenCreateModal(false);
          }}
        />

        <UserUpdateForm
          user={user}
          open={openUpdateModal}
          onUpdate={onUpdate}
          onCancel={() => {
            setOpenUpdateModal(false);
          }}
        />
        <HistoryModal
          open={openHistoryModal}
          onCancel={() => {
            setOpenHistoryModal(false);
          }}
        />
      </div>
      <Table columns={columns} dataSource={userData} />
    </>
  );
};

export default UserList;
