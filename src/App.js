import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const initialData = [
  { id: 1, name: 'Phuoc Quy', email: 'quy@gmail.com' },
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Button className='edit' type="link" onClick={() => editUser(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (_, record) => (
        <Button className='delete' type="link" danger onClick={() => deleteUser(record)}>
          Delete
        </Button>
      ),
    },
  ];

  const showModal = () => {
    form.resetFields();
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        const updatedData = data.map((user) =>
          user.id === editingUser.id ? { ...user, name: values.name } : user
        );
        setData(updatedData);
        message.success('User updated successfully');
      } else {
        const newUser = {
          id: data.length + 1,
          name: values.name,
          email: values.email,
        };
        setData([...data, newUser]);
        message.success('User added successfully');
      }
      setModalVisible(false);
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const editUser = (user) => {
    form.setFieldsValue({ name: user.name });
    setEditingUser(user);
    setModalVisible(true);
  };

  const deleteUser = (user) => {
    Modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to delete user "${user.name}"?`,
      onOk: () => {
        const filteredData = data.filter((u) => u.id !== user.id);
        setData(filteredData);
        message.success('User deleted successfully');
      },
    });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add User
      </Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          {!editingUser && (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default App;