import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import { CreateUserData, Role, User } from '../../../models/user';

interface CollectionUpdateFormProps {
  open: boolean;
  onUpdate: (values: User) => void;
  user: User;
  onCancel: () => void;
}

const UserUpdateForm: React.FC<CollectionUpdateFormProps> = ({ user, open, onUpdate, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...user, role: user.role?.id });
  }, [user]);

  return (
    <Modal
      open={open}
      title="Upadate user"
      onCancel={onCancel}
      footer={[
        <Button
          key="ok-form"
          type="primary"
          className="bg-black"
          onClick={() => {
            form
              .validateFields()
              .then((values: CreateUserData) => {
                form.resetFields();
                const role: Role = {
                  id: values.role,
                  name: values.role === 1 ? 'Admin' : 'User',
                };
                const newDataUser: User = { ...user, username: values.username, role: role };
                onUpdate(newDataUser);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          Update{' '}
        </Button>,
        <Button key="cancel-form" type="primary" className="bg-red-500" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} className="mt-5" layout="vertical" name="form_in_modal">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input the username !' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input type="email" placeholder="Email" disabled />
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

export default UserUpdateForm;
