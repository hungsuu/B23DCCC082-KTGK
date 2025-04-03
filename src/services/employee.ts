import { Employee } from '@/types/employee';

const EMPLOYEE_STORAGE_KEY = 'employees';

// Lấy danh sách nhân viên từ localStorage
export const getEmployees = (): Employee[] => {
  const data = localStorage.getItem(EMPLOYEE_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Lưu danh sách nhân viên vào localStorage
export const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
};