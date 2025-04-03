import React, { useState } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import { Employee } from '@/models/employee';
import { getEmployeesFromStorage, saveEmployeesToStorage } from '@/utils/storage';

const { Option } = Select;

const EmployeeForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Omit<Employee, 'id'>) => {
    const employees = getEmployeesFromStorage();
    const newEmployee: Employee = {
      id: `EMP${Date.now()}`, // Tự động sinh mã nhân viên
      ...values,
    };
    employees.push(newEmployee);
    saveEmployeesToStorage(employees);
    notification.success({ message: 'Thêm nhân viên thành công!' });
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Họ tên"
        name="name"
        rules={[
          { required: true, message: 'Họ tên không được để trống' },
          { max: 50, message: 'Họ tên tối đa 50 ký tự' },
          { pattern: /^[a-zA-Z\s]+$/, message: 'Họ tên không chứa ký tự đặc biệt' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Chức vụ"
        name="role"
        rules={[{ required: true, message: 'Chức vụ không được để trống' }]}
      >
        <Select>
          <Option value="Manager">Manager</Option>
          <Option value="Developer">Developer</Option>
          <Option value="Tester">Tester</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Phòng ban"
        name="department"
        rules={[{ required: true, message: 'Phòng ban không được để trống' }]}
      >
        <Select>
          <Option value="HR">HR</Option>
          <Option value="IT">IT</Option>
          <Option value="Finance">Finance</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Lương"
        name="salary"
        rules={[{ required: true, message: 'Lương không được để trống' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Trạng thái"
        name="status"
        rules={[{ required: true, message: 'Trạng thái không được để trống' }]}
      >
        <Select>
          <Option value="Thử việc">Thử việc</Option>
          <Option value="Đã ký hợp đồng">Đã ký hợp đồng</Option>
          <Option value="Nghỉ phép">Nghỉ phép</Option>
          <Option value="Đã thôi việc">Đã thôi việc</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Thêm nhân viên
      </Button>
    </Form>
  );
};

export default EmployeeForm;