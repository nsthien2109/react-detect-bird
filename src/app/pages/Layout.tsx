import { useEffect, useState } from 'react';
import {
  UserOutlined,
  YuqueOutlined,
  DashboardOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  ScanOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Divider } from 'antd';

import logo from '../../assets/svgs/logo.svg';
import userAccount from '../../assets/svgs/user-account.svg';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logoutAction } from './auth/auth.actions';

const { Header, Sider, Content } = Layout;

const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);

  const auth = useSelector((state: RootState) => state.auth.userInfo);

  let location = useLocation();
  const navigate = useNavigate();

  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  function handleClick(e: any) {
    setCurrent(e.key);
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.id) navigate('/auth/login');
  }, [auth, navigate]);

  return (
    <Layout className="min-h-screen layout" onClick={() => setOpenDropdown(false)}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={279}
        className="px-4 fixed left-0 top-0"
      >
        <img src={logo} alt="Njha detection" className="w-[90px]" />
        {!collapsed && <h4 className="mt-5 mb-1 uppercase label">Overview</h4>}
        <Menu
          theme="light"
          mode="inline"
          onClick={handleClick}
          defaultSelectedKeys={[current]}
          className="py-2"
          items={[
            {
              key: '/',
              icon: <DashboardOutlined />,
              label: <Link to={'/'}>Dashboard</Link>,
            },
            {
              key: '/user',
              icon: <UserOutlined />,
              label: <Link to={'/users'}>Users</Link>,
            },
            {
              key: '/families',
              icon: <ApartmentOutlined />,
              label: <Link to={'/families'}>Families</Link>,
            },
            {
              key: '/orders',
              icon: <AppstoreOutlined />,
              label: <Link to={'/orders'}>Orders</Link>,
            },
            {
              key: '/status',
              icon: <BulbOutlined />,
              label: <Link to={'/status'}>Status</Link>,
            },
            {
              key: '/birds',
              icon: <YuqueOutlined />,
              label: <Link to={'/birds'}>Birds</Link>,
            },
            {
              key: '/prediction',
              icon: <ScanOutlined />,
              label: <Link to={'/prediction'}>Prediction</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between">
            <Button
              type="text"
              icon={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center justify-center w-16 h-16">
              <Button
                className="rounded-full border border-[#00a76f]"
                type="text"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenDropdown(!openDropdown);
                }}
                style={{
                  fontSize: '16px',
                  width: 40,
                  height: 40,
                }}
              >
                <div className="relative settings">
                  <img src={userAccount} className="w-10" alt="Nguyen Si Thien" />
                  <div
                    className={`settings-dropdown ${
                      !openDropdown && 'hidden'
                    } absolute z-10 bg-white top-[110%] right-2 w-[200px] p-5 rounded-md`}
                  >
                    <ul className="setting-list text-start">
                      <li className="setting-item">
                        <div className="infomation">
                          <h5 className="text-sm font-bold username">Nguyen Si Thien</h5>
                          <p className="text-xs email">nsthien@gmail.com</p>
                        </div>
                      </li>
                      <Divider className="my-2" />
                      <li
                        onClick={() => {
                          dispatch(logoutAction() as any);
                        }}
                        className="font-bold text-red-500 setting-item"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
