import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

import type { SizeType } from 'antd/es/config-provider/SizeContext';

import banner from '../../../../assets/images/login-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { loginAction } from '../auth.actions';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const [size] = useState<SizeType>('large'); // default is 'middle'

  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');

  const dispatch = useDispatch();
  const isLoading: boolean = useSelector((state: RootState) => state.auth.isLoading);
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    dispatch(loginAction(values.email, values.password) as any);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
    }
  }, [isLogin]);

  return (
    <div className="px-8 login">
      <div className="flex py-6 flex-column login-wrapper gap-7 lg:flex-row-reverse">
        <div className="flex-1 login-banner">
          <div className="banner-image h-[180px] lg:h-[80vh]">
            <img src={banner} alt="Banner of login" className="object-cover h-full rounded-2xl" />
          </div>
        </div>
        <div className="flex-1 login-form">
          <Form name="basic" autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <h3 className="mb-4 text-2xl font-bold login-title bold">Welcome back 🖐️</h3>
            <p className="text-[12px] login-subtitle font-medium mb-6">
              Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
            </p>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input id="email" placeholder="Example@gmail.com" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button className="w-full mt-4 mb-6 text-white bg-black" htmlType="submit" size={size}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <p className="p-3 text-center">Or sign in with</p>
          <div className="flex gap-4">
            <Button className="flex-1 bg-[#F3F9FA]" size={size} icon={<FacebookOutlined />}>
              Facebook
            </Button>
            <Button className="flex-1  bg-[#F3F9FA]" size={size} icon={<GoogleOutlined />}>
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
