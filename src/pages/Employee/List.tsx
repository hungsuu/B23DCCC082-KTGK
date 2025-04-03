import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, notification } from 'antd';
import { Employee } from '@/types/employee';
import { getEmployees, saveEmployees } from '@/services/employee';
import ModalConfirm from './ModalConfirm';

const { Search } = Input;
const { Option } = Select;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const data = getEmployees();
    setEmployees(data);
    setFilteredEmployees(data);
  }, []);

  const handleSearch = (value: string) => {
    const result = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(value.toLowerCase()) ||
        emp.id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(result);
  };

  const handleDelete = (id: string) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    saveEmployees(updatedEmployees);
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    notification.success({ message: 'Xóa nhân viên thành công!' });
  };

  const columns = [
    { title: 'Mã nhân viên', dataIndex: 'id', key: 'id' },
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
    { title: 'Chức vụ', dataIndex: 'role', key: 'role' },
    { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
    { title: 'Lương', dataIndex: 'salary', key: 'salary' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record: Employee) => (
        <Button
          danger
          onClick={() => setSelectedEmployee(record)}
          disabled={record.status !== 'Thử việc' && record.status !== 'Đã thôi việc'}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Tìm kiếm theo mã hoặc họ tên"
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Table dataSource={filteredEmployees} columns={columns} rowKey="id" />
      {selectedEmployee && (
        <ModalConfirm
          visible={!!selectedEmployee}
          onConfirm={() => {
            handleDelete(selectedEmployee.id);
            setSelectedEmployee(null);
          }}
          onCancel={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;