import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { ADD_ACTION, EDIT_ACTION, DELETE_ACTION } from "consts";
import { createUser, deleteUser, getUsers, editUser } from "redux/actions/userActions";
import CustomModal from "components/CustomModal";
import UserTable from "components/user/UserTable";
import UserForm from "components/user/UserForm";
import { clearUserState, setModalState, storeUser } from "redux/slices/userSlice";

const User = () => {
  const [mode, setMode] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const { users, user, isModalVisible } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleAction = ({ action, data }) => {
    const options = {
      [ADD_ACTION]: () => null,
      [EDIT_ACTION]: () => dispatch(storeUser(data)),
      [DELETE_ACTION]: () => setUserId(data),
    };

    options[action]();
    setMode(action);
    dispatch(setModalState(true));
  };

  const handleCancel = () => {
    dispatch(setModalState(false));
    dispatch(clearUserState());
  };

  const handleCreate = user => dispatch(createUser(user));
  const handleEdit = user => dispatch(editUser(user));
  const handleDelete = () => dispatch(deleteUser(userId));

  return (
    <>
      <Row justify="end">
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => handleAction({ action: ADD_ACTION })}
        >
          Nuevo
        </Button>
      </Row>
      <br />

      <UserTable data={users} handleAction={handleAction} />

      <CustomModal
        title={mode === EDIT_ACTION ? "Formulario Usuario" : "Eliminar Usuario"}
        isModalVisible={isModalVisible}
        footer={mode === EDIT_ACTION || mode === ADD_ACTION ? null : undefined}
        handleOk={handleDelete}
        handleCancel={handleCancel}
      >
        {mode === ADD_ACTION || mode === EDIT_ACTION ? (
          <UserForm
            data={user}
            mode={mode}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
          />
        ) : (
          <p>¿Está seguro que desea eliminar este usuario?</p>
        )}
      </CustomModal>
    </>
  );
};

export default User;
