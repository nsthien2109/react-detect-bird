import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, InputRef, Modal, Space, Table, Image, Spin } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { useDispatch, useSelector } from 'react-redux';
import { Bird } from '../../models/bird';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';

interface BirdModalProps {
  data: Bird[];
  open: boolean;
  isLoading: boolean;
  onCancel: () => void;
}

interface DataType {
  key: number;
  common_name: string;
  vietnamese_name: string;
  scientific_name: string;
  description: string;
  images: string[];
  onDelete: () => void;
  onEdit: () => void;
}

type DataIndex = keyof DataType;

const BirdModel: React.FC<BirdModalProps> = ({ open, onCancel, data, isLoading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className="bg-red"
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
      ...getColumnSearchProps('key'),
    },
    {
      title: 'Common Name',
      dataIndex: 'common_name',
      key: 'common_name',
      width: '30%',
      ...getColumnSearchProps('common_name'),
    },
    {
      title: 'Vietnamese name',
      dataIndex: 'vietnamese_name',
      key: 'vietnamese_name',
      ...getColumnSearchProps('vietnamese_name'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/birds/${record.key}`)} className="bg-blue-300">
            View
          </Button>
        </Space>
      ),
    },
  ];

  const renderData: DataType[] =
    data &&
    data.map((item) => {
      return {
        key: item.id,
        common_name: item.common_name || 'Unknow',
        vietnamese_name: item.vietnamese_name || 'Unknow',
        scientific_name: item.scientific_name || 'Unknow',
        description: item.description || 'Unknow',
        images: item.images || [],
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
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={renderData} />
      </Spin>
    </Modal>
  );
};

export default BirdModel;
