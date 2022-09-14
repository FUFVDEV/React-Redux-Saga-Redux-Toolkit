import { Modal } from "antd";

const CustomModal = ({
  children,
  footer,
  isModalVisible,
  handleCancel,
  handleOk,
  okText = "OK",
  title,
}) => {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      footer={footer}
      destroyOnClose
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
