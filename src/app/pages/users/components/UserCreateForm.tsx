import React from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import {CreateUserData} from "../../../models/user";


interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: CreateUserData) => void;
  onCancel: () => void;
}

const UserCreateForm: React.FC<CollectionCreateFormProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Create a new user"
      onCancel={onCancel}
      footer={[
        <Button
            key="ok-form"
          type="primary"
          className="bg-black"
          onClick={() => {
            form
              .validateFields()
              .then((values : CreateUserData) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          Create{' '}
        </Button>,
        <Button  key="cancel-form" type="primary" className="bg-red-500" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} className="mt-5" layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input the username !' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email !' }]}>
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the password !' }]}
        >
          <Input placeholder="Password" type="password" />
        </Form.Item>

        <Form.Item name="role" label="Role" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value={1}>Admin</Radio>
            <Radio value={2}>User</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreateForm;
