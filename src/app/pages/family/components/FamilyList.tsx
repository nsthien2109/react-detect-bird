import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Breadcrumb, Button, Input, Space, Spin, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getAllFamilyAction, getFamilyAction } from '../family.actions';
import BirdModel from '../../../shared/components/BirdModel';
import { Link } from 'react-router-dom';

interface BirdFamilyType {
  key: number;
  familyName: string;
  familyVietnameseName: string;
}

type DataIndex = keyof BirdFamilyType;

const FamilyList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [isOpenBirdModel, setIsOpenBirdModel] = useState(false);

  const dispatch = useDispatch();
  const { families, familyDetail, isLoading } = useSelector((state: RootState) => state.family);

  useEffect(() => {
    dispatch(getAllFamilyAction() as any);
  }, []);

  const familiesData: BirdFamilyType[] = families?.map((item) => {
    return {
      key: item.id,
      familyName: item.familyName,
      familyVietnameseName: item.familyVietnameseName || 'Not Update',
    };
  });

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<BirdFamilyType> => ({
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

  const columns: ColumnsType<BirdFamilyType> = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
      width: '20%',
      ...getColumnSearchProps('key'),
    },
    {
      title: 'Family name',
      dataIndex: 'familyName',
      key: 'familyName',
      width: '30%',
      ...getColumnSearchProps('familyName'),
    },
    {
      title: 'Vietnamese name',
      dataIndex: 'familyVietnameseName',
      key: 'familyVietnameseName',
      ...getColumnSearchProps('familyVietnameseName'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={async () => {
              await dispatch(getFamilyAction(record.key) as any);
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

  return (
    <>
      <Breadcrumb
        className="mb-7"
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: 'Families',
          },
        ]}
      />
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={familiesData} />{' '}
      </Spin>
      <BirdModel
        data={[...(familyDetail.birds ?? [])]}
        open={isOpenBirdModel}
        isLoading={isLoading}
        onCancel={() => {
          setIsOpenBirdModel(false);
        }}
      />
    </>
  );
};

export default FamilyList;
