import React from 'react';
import { Modal } from 'antd';

interface ModalConfirmProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
    >
      Bạn có chắc chắn muốn xóa nhân viên này không?
    </Modal>
  );
};

export default ModalConfirm;